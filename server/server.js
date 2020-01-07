const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const debug = require('debug')('app:server')
const passport = require('passport')

const users = require('./routes/api/users')
const teams = require('./routes/api/teams')
const boards = require('./routes/api/boards')

const app = express()
app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

const db = require('./config/keys').mongoURI
mongoose
  .connect(
    db,
    { useNewUrlParser: true },
  )
  .then(() => debug('MongoDB successfully connected'))
  .catch(err => debug(err))

app.use(passport.initialize())
require('./config/passport')(passport)
app.use('/api/users', users)
app.use('/api/teams', teams)
app.use('/api/boards', boards)

const port = process.env.PORT || 5000
app.listen(port, () => debug(`Server up and running on port ${port}!`))
