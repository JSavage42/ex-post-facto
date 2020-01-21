const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const debug = require('debug')('app:server')
const passport = require('passport')

const users = require('./routes/api/users')
const teams = require('./routes/api/teams')
const boards = require('./routes/api/boards')

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

mongoose
  .connect(db, { useNewUrlParser: true, connectWithNoPrimary: true, useUnifiedTopology: true })
  .then(() => debug('MongoDB successfully connected'))
  .catch(err => debug(err))

app.listen(serverPort, () => debug(`Server up and running on port ${serverPort}!`))
