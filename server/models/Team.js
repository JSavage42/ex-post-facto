const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  uid: {
    type: String,
  },
})

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [MemberSchema],
    required: false,
    default: [],
  },
})

// eslint-disable-next-line no-undef
module.exports = Team = mongoose.model('teams', TeamSchema)
