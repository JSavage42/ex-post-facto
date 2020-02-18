const bodyParser = require('body-parser')
const cors = require('cors')
const debug = require('debug')('app:server')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const boards = require('./routes/api/boards')
const cards = require('./routes/api/cards')
const teams = require('./routes/api/teams')
const users = require('./routes/api/users')

const Board = require('./models/Board')
const Card = require('./models/Card')
const Team = require('./models/Team')
const User = require('./models/User')

const db = require('./config/keys').mongoURI
const serverPort = require('./config/keys').serverPort
require('./config/passport')(passport)
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/api/users', users)
app.use('/api/teams', teams)
app.use('/api/boards', boards)
app.use('/api/cards', cards)

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => debug('MongoDB successfully connected'))
  .catch(err => debug(err))

const pipeline = {
  fullDocument: 'updateLookup',
}

Board.watch(pipeline).on('change', data => {})
Card.watch(pipeline).on('change', data => {})
User.watch(pipeline).on('change', data => {})
Team.watch(pipeline).on('change', data => {})

app.listen(serverPort, () => debug(`Server up and running on port ${serverPort}!`))
