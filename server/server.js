const express = require('express')
const cors = require('cors')
const r = require('rethinkdb')
const bodyParser = require('body-parser')
const debug = require('debug')('app:server')
const passport = require('passport')
const config = require('./config')

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
const { host, port, db } = config.database
r.connect({ host, port, db }).then(conn => {
  connection = conn
  const tableList = ['users', 'boards', 'teams', 'cards']
  tableList.map(table => {
    r.table(table).changes().run(connection).then(cursor => {
      cursor.each(row => {
        debug(JSON.stringify(row, null, 2))
      })
    })
  })
})

app.use(passport.initialize())
require('./config/passport')(passport)
app.use('/api/users', users)
app.use('/api/teams', teams)
app.use('/api/boards', boards)

const appPort = config.port
app.listen(appPort, () => debug(`Server up and running on port ${appPort}!`))
