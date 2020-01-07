const express = require('express')
const router = express.Router()
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
  newBoard.save().then(board => res.json(board)).catch(e => debug(e))
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
router.get('/team/:tid', (req, res) => {
  const { tid } = req.param
  Board.find({ team: `${req.params.tid}` }).then(board => {
    res.json(board)
  }).catch(e => debug(e))
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

// * Cards (VERB - CRUD -- Description)
// ** POST - CREATE -- Adds a Card
router.post('/:bid/add-card', (req, res) => {
  const { type } = req.body
  const { bid } = req.params
  Board.findById(bid).then(board => {
    board.cards.push({ type })
    board.save()
    res.json({ board })
  })
})

// ** GET - READ(ALL) -- Finds all cards from bid.
router.get('/:bid/cards', (req, res) => {
  const { bid } = req.params
  Board.findById(bid).then(board => {
    res.json(board.cards)
  }).catch(e => debug(e))
})

// ** GET - READ(TYPE) -- Finds all cards from board with bid and type of cards.
router.get('/:bid/cards/:type', (req, res) => {
  const { bid, type } = req.params
  Board.findById(bid).then(board => {
    const cards = board.cards.filter(card => card.type === type)
    res.json(cards)
  }).catch(e => debug(e))
})

// ** GET - READ -- Finds a card from cid.
router.get('/:bid/:cid', (req, res) => {
  const { bid, cid } = req.params
  Board.findById(bid).then(board => {
    res.json(board.cards.id(cid))
  }).catch(e => debug(e))
})

// ** POST - UPDATE -- Updates a card from cid.
router.post('/:bid/:cid/update', (req, res) => {
  const { bid, cid } = req.params
  const { content, votes } = req.body
  Board.findById(bid)
    .then(board => {
      const card = board.cards.id(cid)
      if (content !== undefined) {
        if (votes === undefined) {
          card.content = content
          board.save()
          res.json({ card })
        } else {
          card.content = content
          card.votes = votes
          board.save()
          res.json({ card })
        }
      } else {
        if (votes !== undefined) {
          card.votes = votes
          board.save()
          res.json({ card })
        } else {
          res.json({ message: 'No content to update' })
        }
      }
    })
    .catch(e => debug(e))
})

// ** DELETE - DELETE -- Deletes a card from cid.
router.delete('/:bid/:cid', (req, res) => {
  const { bid, cid } = req.params
  Board.findById(bid).then(board => {
    board.cards.id(cid).remove()
    board.save()
    res.json({ board })
  }).catch(e => debug(e))
})

module.exports = router
