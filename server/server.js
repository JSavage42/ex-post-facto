const r = require('rethinkdb')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const debug = require('debug')('app:server')
const passport = require('passport')

const config = require('./config')
const users = require('./routes/api/users')
const teams = require('./routes/api/teams')
const boards = require('./routes/api/boards')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const { host, port, db } = config.database
r.connect({ host, port, db }).then(conn => {
  connection = conn
  r.table('users')
    .changes()
    .run(connection)
    .then(cursor => {
      cursor.each(row => {
        debug(row)
      }).catch(e => debug(e))
    })
  r.table('boards')
    .changes()
    .run(connection)
    .then(cursor => {
      cursor.each(row => {
        debug(row)
        debug(cursor)
      }).catch(e => debug(e))
    })
  r.table('teams')
    .changes()
    .run(connection)
    .then(cursor => {
      cursor.each(row => {
        debug(row)
        debug(cursor)
      }).catch(e => debug(e))
    })
  r.table('cards')
    .changes()
    .run(connection)
    .then(cursor => {
      cursor.each(row => {
        debug(JSON.stringify(row, null, 2))
      }).catch(e => debug(e))
    })
})

app.use(passport.initialize())
require('./config/passport')(passport)
app.use('/api/users', users)
app.use('/api/teams', teams)
app.use('/api/boards', boards)

const appPort = config.port
app.listen(appPort, () => debug(`Server up and running on port ${appPort}!`))
