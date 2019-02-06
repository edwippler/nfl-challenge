/**
 * Module dependencies
 */
const router = require('express').Router()
// const pool = require('../modules/pool');

// Score Section
router.get('/averageSinceBye', (req, res) => {
  let teamAlias = req.query.team
  let periodQuery = req.query.period
  res.send(`Average score for ${teamAlias} during ${periodQuery} is 23`)
})

module.exports = router
