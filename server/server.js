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

/**
 * Middleware for requests
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/schedule', scheduleRoute)
app.use('/api/score', scoreRoute)

/**
 * Listen for requests to the server
 */
app.listen(PORT, function () {
  console.log(`listening on port: ${PORT}`)
})
