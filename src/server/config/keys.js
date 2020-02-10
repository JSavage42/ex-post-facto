module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27018/epf-db?replicaSet=rs0',
  secretOrKey: 'secret',
  serverPort: process.env.PORT || 3000,
}
