const express = require('express')
const morgan = require('morgan')
const path = require('path')
require('./database')

require('dotenv').config()
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Middleware
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/workers', require('./routes/worker.routes'))
app.use('/user', require('./routes/user.routes'))

// Static Files
app.use(express.static(path.join(__dirname, 'public')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
// Starting the server

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})
