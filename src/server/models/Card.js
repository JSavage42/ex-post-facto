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
    default: '',
  },
  board: {
    type: String,
    required: true,
    default: '',
  },
})

// eslint-disable-next-line no-undef
module.exports = Card = mongoose.model('cards', CardSchema)
