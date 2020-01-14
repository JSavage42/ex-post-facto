const debug = require('debug')('app:controller')

module.exports = app => {
  app.get('/', (req, res) => {
    debug('/')
  })
}
