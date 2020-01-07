const express = require('express')
const router = express.Router()
const debug = require('debug')('app:teamsApi')

const Team = require('../../models/Team')
const User = require('../../models/User')

// * Teams (VERB - CRUD -- Description)
// ** POST -- CREATE -- Creates a new team.
router.post('/create', (req, res) => {
  const { name } = req.body
  const newTeam = new Team({ name })
  newTeam.save().then(team => res.json(team)).catch(e => debug(e))
})

// ** GET - READ(ALL) -- Finds all teams.
router.get('/', (req, res) => {
  Team.find({}).then(teams => {
    res.json(teams)
  })
})

// ** GET - READ -- Finds team by tid.
router.get('/:tid', (req, res) => {
  Team.findById(req.params.tid).then(team => {
    res.json(team)
  })
})

// ** POST - UPDATE -- Updates a team's name.
router.post('/:tid/update', (req, res) => {
  const { name } = req.body
  Team.findById(req.params.tid).then(team => {
    team.name = name
    team.save()
    res.json({ team })
  })
})

// ** DELETE - DELETE -- Deletes a team.
router.delete('/:tid', (req, res) => {
  Team.findById(req.params.tid).then(team => {
    team.remove()
  })
})

// * Team Members
// ** POST - CREATE/UPDATE -- Adds members to Team.
router.post('/:tid/add-member', (req, res) => {
  const { tid } = req.params
  const { uid } = req.body
  Team.findById(tid).then(team => {
    User.findById(uid).then(user => {
      team.members.push(user)
      team.save()
      res.json({ team })
    })
  }).catch(e => debug(e))
})

// ** GET - READ(ALL) -- Gets all team members
router.get('/:tid/members', (req, res) => {
  const { tid, uid } = req.params
  Team.findById(tid).then(team => {
    res.json(team.members)
  }).catch(e => debug(e))
})

// ** GET - READ -- Gets team member by uid.
router.get('/:tid/:uid', (req, res) => {
  const { tid, uid } = req.params
  Team.findById(tid).then(team => {
    function filterById(id) {
      if (id === uid) {
        return true
      }
      return false
    }
    res.json(team.members.filter(filterById))
  }).catch(e => debug(e))
})

// ** POST - DELETE -- Deletes member from team member list.
router.delete('/:tid/:uid', (req, res) => {
  const { tid, uid } = req.params
  Team.findById(tid).then(team => {
    function filterById(id) {
      if (id === uid) {
        return true
      }
      return false
    }
    team.members.pull().filter(filterById)
    team.save()
    res.json({ message: `Deleted team ${team.name}`})
  }).catch(e => debug(e))
})

module.exports = router
