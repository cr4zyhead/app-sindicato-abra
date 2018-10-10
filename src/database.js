const mongoose = require('mongoose')

const URI = 'mongodb://localhost/workers-account'

mongoose.set('useCreateIndex', true)
mongoose.connect(URI, { useNewUrlParser: true })
  .then(db => console.log('DB Connected'))
  .catch(err => console.log(err))

module.exports = mongoose
