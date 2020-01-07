const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
  votes: {
    type: Number,
    required: false,
    default: 0,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
    default: ''
  },
})

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  cards: {
    type: [CardSchema],
    required: false,
    default: [],
  },
})

module.exports = Board = mongoose.model('boards', BoardSchema)
