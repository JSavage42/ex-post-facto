const express = require('express')
const router = express.Router()
const debug = require('debug')('app:boardsApi')
const r = require('rethinkdb')

const boards = r.table('boards')
const cards = r.table('cards')

// * Boards (VERB - CRUD -- Description)
// ** POST - CREATE -- Creates a new board.
router.post('/create', (req, res) => {
  const { title, team } = req.body
  const newBoard = ({
    title,
    team,
  })
  boards.insert(newBoard).run(connection).then(board => res.json(board)).catch(e => debug(e))
})

// ** GET - READ(ALL) -- Finds all boards.
router.get('/', (req, res) => {
  boards.changes().run(connection).then(boards => {
    debug(boards)
    res.json({ message: 'Got all boards'})
  })
})

// ** GET - READ -- Finds a board from bid.
router.get('/:bid', (req, res) => {
  const { bid } = req.params
  boards.get(bid).run(connection).then(board => {
    res.json(board)
  }).catch(e => debug(e))
})

// ** GET -READ(FROM TEAM ID) -- Finds boards by tid.
router.get('/team/:tid', (req, res) => {
  const { tid } = req.params
  boards.getAll(tid, {index: 'team'}).run(connection).then(boards => {
    boards.toArray().then(board => res.json(board))
  }).catch(e => debug(e))
})

// ** POST - UPDATE -- Updates a board from bid.
router.post('/:bid/update', (req, res) => {
  const { bid } = req.params
  const { title, team } = req.body
  if (title !== undefined) {
    if (team === undefined) {
      boards.get(bid).update({ title }).run(connection)
        .then(board => res.json({ board }))
        .catch(e => debug(e))
    } else {
      boards.get(bid).update({ title, team }).run(connection)
        .then(board => res.json({ board }))
        .catch(e => debug(e))
    }
  } else {
    if (team !== undefined) {
      boards.get(bid).update({ team }).run(connection)
        .then(board => res.json({ board }))
        .catch(e => debug(e))
    } else {
      res.json({ message: 'No content to update' })
    }
  }
})

// ** DELETE - DELETE -- Deletes a board from bid.
// TODO Delete cards associated with board.
router.delete('/:bid', (req, res) => {
  const { bid } = req.params
  boards.get(bid).delete().run(connection).then(() => {
    res.json({ message: `Deleted board ${bid}` })
  }).catch(e => debug(e))
})

// * Cards (VERB - CRUD -- Description)
// ** POST - CREATE -- Adds a Card
router.post('/:bid/add-card', (req, res) => {
  const { type } = req.body
  const { bid } = req.params
  const newCard = ({
    bid,
    type,
    content: '',
    votes: 0,
  })
  cards.insert(newCard).run(connection).then(() => {
    res.json(newCard)
  })
})

// ** GET - READ(ALL) -- Finds all cards from bid.
router.get('/:bid/cards', (req, res) => {
  const { bid } = req.params
  cards.getAll(bid, {index: 'bid'}).run(connection).then(cards => {
    cards.toArray().then(card => {
      res.json(card)
    })
  }).catch(e => debug(e))
})

// ** GET - READ(TYPE) -- Finds all cards from board with bid and type of cards.
router.get('/:bid/cards/:type', (req, res) => {
  const { bid, type } = req.params
  cards.filter(r.row('bid').eq(bid).and(r.row('type').eq(type))).run(connection).then(cards => {
    cards.toArray().then(result => res.json(result))
  })
})

// ** GET - READ -- Finds a card from cid.
router.get('/cards/:cid', (req, res) => {
  const { cid } = req.params
  cards.get(cid).run(connection).then(card => {
    res.json(card)
  }).catch(e => debug(e))
})

// ** POST - UPDATE -- Updates a card from cid.
router.post('/cards/:cid/update', (req, res) => {
  const { cid } = req.params
  const { content, votes } = req.body
  if (content !== undefined) {
    if (votes === undefined) {
      cards.get(cid).update({content}).run(connection).then(card => res.json({ card }))
    } else {
      cards.get(cid).update({ content, votes }).run(connection).then(card => res.json({ card }))
    }
  } else {
    if (votes !== undefined) {
      cards.get(cid).update({ votes }).run(connection).then(card => res.json({ card }))
    } else {
      res.json({ message: 'No content to update' })
    }
  }
})

// ** DELETE - DELETE -- Deletes a card from cid.
router.delete('/cards/:cid', (req, res) => {
  const { cid } = req.params
  cards.get(cid).delete().run(connection).then(() => {
    res.json({ message: 'Card has been deleted'})
  }).catch(e => debug(e))
})

module.exports = router
