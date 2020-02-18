const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'USER',
  },
  team: {
    type: String,
    required: false,
  },
})

// eslint-disable-next-line no-undef
module.exports = User = mongoose.model('users', UserSchema)
