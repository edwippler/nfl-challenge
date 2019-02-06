/**
 * Module dependencies
 */
const router = require('express').Router()
// const pool = require('../modules/pool');

// Bye Section
router.get('/bye', (req, res) => {
  let teamAlias = req.query.team
  // Use previous year as default if no year specified
  let year = req.query.year || (new Date().getFullYear() - 1)
  res.send(`Team Provided: ${teamAlias} for ${year} Regular season`)
})

module.exports = router
