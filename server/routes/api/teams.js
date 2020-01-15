const express = require('express')
const router = express.Router()
const debug = require('debug')('app:teamsApi')
const r = require('rethinkdb')

const teams = r.table('teams')
const users = r.table('users')

// * Teams (VERB - CRUD -- Description)
// ** POST -- CREATE -- Creates a new team.
router.post('/create', (req, res) => {
  const { name } = req.body
  const newTeam = ({ name })
  teams.insert(newTeam)
    .run(connection)
    .then(team => res.json(team))
    .catch(e => debug(e))
})

// ** GET - READ(ALL) -- Finds all teams.
router.get('/', (req, res) => {
  teams.run(connection).then(teams => {
    teams.toArray().then(teams => res.json(teams))
  })
})

// ** GET - READ -- Finds team by tid.
router.get('/:tid', (req, res) => {
  teams.get(req.params.tid).run(connection).then(team => {
    res.json(team)
  }).catch(e => debug(e))
})

// ** POST - UPDATE -- Updates a team's name.
router.post('/:tid/update', (req, res) => {
  const { name } = req.body
  team.get(req.params.tid).update({ name }).run(connection).then(team => res.json({ team })).catch(e => debug(e))
})

// ** DELETE - DELETE -- Deletes a team.
router.delete('/:tid', (req, res) => {
  teams.get(req.params.tid).delete().run(connection).then(() => {
    res.json({ message: 'Deleted team'})
  })
})

// * Team Members
// ** POST - CREATE/UPDATE -- Adds members to Team.
router.post('/:tid/add-member', (req, res) => {
  const { tid } = req.params
  const { uid } = req.body
  const team = tid
  if (uid !== undefined) {
    users.get(uid).update({ team }).run(connection).then(user => res.json({ user }))
  } else {
    res.json({ message: 'No content to update' })
  }
})

// ** GET - READ(ALL) -- Gets all team members
router.get('/:tid/members', (req, res) => {
  const { tid, uid } = req.params
  users.getAll(tid, {index: 'team'}).run(connection).then(teams => {
    teams.toArray().then(teams => res.json(teams))
  }).catch(e => debug(e))
})

// ** POST - DELETE -- Deletes member from team member list.
router.delete('/:tid/:uid', (req, res) => {
  const { uid } = req.params
  user.get(uid).update({ team: '' }).run(connection).then(team => {
    res.json({ message: `Removed team member`})
  }).catch(e => debug(e))
})

// ** POST - DELETE -- Deletes team.
router.delete('/:tid', (req, res) => {
  const { tid } = req.params
  user.get(tid).delete().run(connection).then(team => {
    res.json({ message: `Removed team`})
  }).catch(e => debug(e))
})

module.exports = router
