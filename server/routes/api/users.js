const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const debug = require('debug')('app:usersApi')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')

// * Users (VERB - CRUD -- Description)
// ** POST - CREATE -- Creates new user with salted password.
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'A user account with this email already exists. Please try logging in with this email' })
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => debug(err))
        })
      })
    }
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

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'No user associated with this email has been found'})
    }

    bcrypt.compare(password, user.password).then(isMatch => {
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

// ** GET - READ(ALL) -- Get all users.
router.get('/', (req, res) => {
  User.find({}).then(users => {
    res.json(users)
  })
})

// ** GET - READ -- Get user's profile information.
router.get('/:uid', (req, res) => {
  const { uid } = req.params
  User.findById(uid).then(user => {
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
  User.findById(uid).then(user => {
    if (name !== undefined) {
      if (email === undefined) {
        user.name = name
        user.save()
        res.json({ user })
      } else {
        user.name = name
        user.email = email
        user.save()
        res.json({ user })
      }
    } else {
      if (email !== undefined) {
        user.email = email
        user.save()
        res.json({ user })
      } else {
        res.json({ message: 'No content to update' })
      }
    }
  }).catch(e => debug(e))
})

// ** POST -- UPDATE -- Updates user's password.
router.post('/:uid/password', (req, res) => {
  const { uid } = req.params
  const { password1, password2 } = req.body
  if (password1 === password2) {
    User.findById(uid).then(user => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password1, salt, (err, hash) => {
          if (err) throw err
          user.password = hash
          user
            .save()
            .then(user => res.json(user))
            .catch(err => debug(err))
        })
      })
    }).catch(e => debug(e))
  } else {
    res.json({ message: 'Passwords do not match.'})
  }
})

// ** DELETE -- DELETE -- Deletes the user.
router.delete('/:uid', (req, res) => {
  const { uid } = req.params
  User.findByIdAndDelete(uid).then(user => {
    res.json({ message: `User, ${user.name}, has been deleted`})
  }).catch(e => debug(e))
})

module.exports = router
