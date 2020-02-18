module.exports = {
  mongoURI: 'mongodb://epf_mongo1:27017,mongo2:27017,mongo3:27017/epf_db?slaveOk=true',
  secretOrKey: 'secret',
  serverPort: process.env.PORT || 5000,
}
