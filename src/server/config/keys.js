module.exports = {
  mongoURI: process.env.MONGO_URL || 'mongodb://localhost:27018/epf-db?replicaSet=rs0',
  secretOrKey: 'secret',
  serverPort: process.env.SERVER_PORT || 5000,
}
