const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const debug = require('debug')('app:usersApi')
const r = require('rethinkdb')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const users = r.table('users')

// * Users (VERB - CRUD -- Description)
// ** POST - CREATE -- Creates new user with salted password.
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  let isUser
  users.getAll(req.body.email, {index: 'email'}).run(connection).then(cursor => {
    cursor.toArray().then(results => {
      isUser = results && results.length !== 0
      if (isUser) {
        return res.status(400).json({ email: `A user account with this email already exists. Please try logging in with this email ${isUser}` })
      } else {
        const newUser = ({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          team: '',
        })

        bcrypt.genSalt(10).then(salt => {
          bcrypt.hash(newUser.password, salt).then(hash => {
          newUser.password = hash
            r.table('users').insert(newUser).run(connection).then(newUse => {
              res.json(newUse)
            }).catch(e => debug(e))
          }).catch (e => debug(e))
        }).catch(e => debug(e))
      }
    })
  })
})

// ** POST - READ -- Finds user and compares password hashes.
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  users.filter({ email }).run(connection).then(cursor => {
    debug(cursor)
    cursor.toArray().then(user => {
      debug(user[0].password)

      if (!user) {
        return res.status(404).json({ emailnotfound: 'No user associated with this email has been found'})
      }

      bcrypt.compare(password, user[0].password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
          name: user.name
        }

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            })
          }
          )
        } else {
          return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect'})
        }
      })
      })
    })
})

// ** GET - READ(ALL) -- Get all users.
router.get('/', (req, res) => {
  r.table('users').run(connection).then(cursor => {
    cursor.toArray().then(results => res.json(results))
  }).catch(e => debug(e))
})

// ** GET - READ -- Get user's profile information.
router.get('/:uid', (req, res) => {
  const { uid } = req.params
  users.get(uid).run(connection).then(user => {
    res.json({
      uid,
      name: user.name,
      email: user.email,
    })
  }).catch(e => debug(e))
})

// ** POST -- UPDATE -- Updates user's profile information
router.post('/:uid/update', (req, res) => {
  const { uid } = req.params
  const { name, email } = req.body
  if (name !== undefined) {
    if (email === undefined) {
      users.get(uid).update({ name }).run(connection).then(user => res.json({ user }))
    } else {
      users.get(uid).update({ name, email }).run(connection).then(user => res.json({user}))
    }
  } else {
    if (email !== undefined) {
      users.get(uid).update({ email }).run(connection).then(user => res.json({ user }))
    } else {
      res.json({ message: 'No content to update' })
    }
  }
})

// ** POST -- UPDATE -- Updates user's password.
router.post('/:uid/password', (req, res) => {
  const { uid } = req.params
  const { password1, password2 } = req.body
  if (password1 === password2) {
    bcrypt.genSalt(10).then(salt => {
      bcrypt.hash(password1, salt).then(hash => {
        password = hash
        users.get(uid).update({ password }).run(connection).then(user => {
          res.json(user)
        }).catch(e => debug(e))
      })
    }).catch(e => debug(e))
  } else {
    res.json({ message: 'Passwords do not match.'})
  }
})

// ** DELETE -- DELETE -- Deletes the user.
router.delete('/:uid', (req, res) => {
  const { uid } = req.params
  users.get(uid).delete().run(connection).then(() => {
    res.json({ message: `User has been deleted`})
  }).catch(e => debug(e))
})

module.exports = router
