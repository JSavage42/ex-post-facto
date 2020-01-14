module.exports = {
  database: {
    db: process.env.RDB_DB || 'epf',
    host: process.env.RDB_HOST || 'localhost',
    port: process.env.RDB_PORT || 28015,
  },
  port: process.env.APP_PORT || 5000,
}
