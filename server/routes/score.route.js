/**
 * Module dependencies
 */
const router = require('express').Router()
const pool = require('../modules/pool')

// Score Section
router.get('/averageSinceBye', (req, res) => {
  let teamAlias = req.query.team
  let periodSpecified = req.query.period
  let queryText = 'SELECT * FROM teams WHERE abbr = $1'
  pool.query(queryText, [teamAlias]).then((result) => {
    res.send(result.rows)
  })
  .catch((error) => {
    console.log(`Error in score.route when provided Team: ${teamAlias} and Period: ${periodSpecified}`)
    res.sendStatus(500)
  })
  // res.send(`Average score for ${teamAlias} during ${periodSpecified} is 23`)
})

module.exports = router
