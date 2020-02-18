const debug = require('debug')('app:cardsApi')
const express = require('express')
const router = express.Router()
const sseExpress = require('sse-express')

const Card = require('../../models/Card')

// * Cards (VERB - CRUD -- Description)
// ** POST - CREATE -- Adds a Card
router.post('/:bid/add-card', (req, res) => {
  const { type } = req.body
  const { bid } = req.params
  const newCard = new Card({
    votes: 0,
    content: '',
    type,
    board: bid,
  })
  console.log(req.params.bid)
  newCard.save().then(card => res.json(card)).catch(e => debug(e))
})

// ** GET - READ(ALL) -- Finds all cards from bid.
router.get('/', (req, res) => {
  Card.find({}).then(cards => {
    res.json(cards)
  }).catch(e => debug(e))
})

// ** GET - READ(ALL) -- Finds all cards from bid.
router.get('/board/:bid', (req, res) => {
  const { bid } = req.params
  Card.find({ board: bid }).then(card => {
    res.json(card)
  }).catch(e => debug(e))
})

// ** GET - READ(TYPE) -- Finds all cards from board with bid and type of cards.
router.get('/:bid/:type', sseExpress, (req, res) => {
  const { bid, type } = req.params
  setInterval(() => {
    Card.find().and([{ board: bid }, { type }]).then(cards => {
      res.sse('cards', {
        cards,
      })
    }).catch(e => debug(e))
  }, 2000) 
})

// ** GET - READ -- Finds a card from cid.
router.get('/:cid', (req, res) => {
  const { cid } = req.params
  Card.find({ _id: cid }).then(card => {
    res.json(card)
  }).catch(e => debug(e))
})

// ** POST - UPDATE -- Updates a card from cid.
router.post('/:cid/update', (req, res) => {
  const { cid } = req.params
  const { content, votes } = req.body
  Card.findById(cid)
    .then(card => {
      if (content !== undefined) {
        if (votes === undefined) {
          card.content = content
          card.save()
          res.json({ card })
        } else {
          debug(content)
          card.content = content
          card.votes = votes
          card.save()
          res.json({ card })
        }
      } else {
        if (votes !== undefined) {
          card.votes = votes
          card.save()
          res.json({ card })
        } else {
          res.json({ message: 'No content to update' })
        }
      }
    })
    .catch(e => debug(e))
})

// ** DELETE - DELETE -- Deletes a card from cid.
router.delete('/:cid', (req, res) => {
  const { cid } = req.params
  Card.deleteOne({ _id: cid }).then(card => {
    res.json({ message: `Deleted card ${cid}`})
  }).catch(e => debug(e))
})

module.exports = router
