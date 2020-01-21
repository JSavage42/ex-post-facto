module.exports = {
  mongoURI: process.env.MONGO_URL || 'mongodb://localhost:27017/epf-db',
  secretOrKey: 'secret',
  serverPort: process.env.SERVER_PORT || 5000,
}
