/**
 * Module dependencies
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const scheduleRoute = require('./routes/schedule.route')
const scoreRoute = require('./routes/score.route')
// Port definiton
const PORT = process.env.PORT || 5000

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to NFL data application')
})

/**
 * Middleware for requests
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/schedule', scheduleRoute)
app.use('/score', scoreRoute)

/**
 * Listen for requests to the server
 */
app.listen(PORT, function () {
  console.log(`listening on port: ${PORT}`)
})
