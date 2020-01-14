const debug = require('debug')('app:Models')
const r = require('rethinkdb')
const config = require('../config')

const model = module.exports
model.setup = callback => {
  debug('Setting up RethinkDB')

  r.connect(config.database).then(conn => {
    r.dbCreate(config.database.db).run(conn).then(res => debug('Database created')).error(e => debug("Database already created..."))
  }).error(e => debug(e)).finally(() => {
    r.table(USERS_TABLE).limit(1).run(conn, (err, cursor) => {
      let promise
      if (err) {
        debug("Creating talbe...")
        promise = r.tableCreate(USERS_TABLE).run(conn)
      } else {
        promise = cursor.toArray()
      }

      promise.then(result => {
        debug('Setting up update listener...')
        r.table(USERS_TABLE).changes().run(conn).then(cursor => {
          cursor.each((err, row) => {
            callback(row)
          })
        })
      })
    })
  })
}
