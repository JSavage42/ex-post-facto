const express = require('express')
const router = express.Router()
const sseExpress = require('sse-express')
const debug = require('debug')('app:boardsApi')

const Board = require('../../models/Board')

// * Boards (VERB - CRUD -- Description)
// ** POST - CREATE -- Creates a new board.
router.post('/create', (req, res) => {
  const { title, team } = req.body
  const newBoard = new Board({
    title,
    team,
  })
  newBoard.save().then(() => Board.find({}).then(boards => res.json(boards))).catch(e => debug(e))
})

// ** GET - READ(ALL) -- Finds all boards.
router.get('/', (req, res) => {
  Board.find({}).then(boards => {
    res.json(boards)
  })
})

// ** GET - READ -- Finds a board from bid.
router.get('/:bid', (req, res) => {
  Board.findById(req.params.bid).then(board => {
    res.json(board)
  }).catch(e => debug(e))
})

// ** GET -READ(FROM TEAM ID) -- Finds boards by tid.
router.get('/team/:tid', sseExpress, (req, res) => {
  const { tid } = req.params
  Board.find({ team: `${tid}` }).then(boards => {
    res.sse('connect', {
      boards,
    })
  })
  setInterval(() => {
    Board.find({ team: `${tid}` }).then(boards => {
      res.sse('boards', {
        boards,
      })
    }).catch(e => debug(e))
  }, 500)
})

// ** POST - UPDATE -- Updates a board from bid.
router.post('/:bid/update', (req, res) => {
  const { bid } = req.params
  const { title, team } = req.body
  Board.findById(bid)
    .then(board => {
      if (title !== undefined) {
        if (team === undefined) {
          board.title = title
          board.save()
          res.json({ board })
        } else {
          board.title = title
          board.team = team
          board.save()
          res.json({ board })
        }
      } else {
        if (team !== undefined) {
          board.team = team
          board.save()
          res.json({ board })
        } else {
          res.json({ message: 'No content to update' })
        }
      }
    })
    .catch(e => debug(e))
})

// ** DELETE - DELETE -- Deletes a board from bid.
router.delete('/:bid', (req, res) => {
  Board.deleteOne({ _id: req.params.bid }).then(() => {
    res.json({ message: `Deleted board ${req.params.bid}`})
  }).catch(e => debug(e))
})

module.exports = router
