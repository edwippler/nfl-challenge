/**
 * Module dependencies
 */
const router = require('express').Router()
const pool = require('../modules/pool')
const queries = require('../constants/queries')
const self = this

/**
 * Helper function to define the period text to be queried
 * Uses point_total if no period defined
 */
self.determinePeriod = (selectedPeriod) => {
  let period = 'point_total'
  if (selectedPeriod === 'OT') {
    period = 'point_ot'
  } else if (selectedPeriod) {
    period = `point_q${selectedPeriod}`
  }
  return period
}

/**
 * Main Score funtions section to return average score
 */
router.get('/averageSinceBye/:team', (req, res) => {
  let teamAlias = req.params.team
  let inputPeriod = req.query.period
  // Query for bye week first
  pool.query(queries.getTeamByeWeekQuery, [teamAlias])
    .then((result) => {
      // Use the resut of the bye week to query average score
      let byeWeek = result.rows[0].bye_week
      let selectedPeriod = self.determinePeriod(inputPeriod)
      let scoreQueryText = `SELECT team_abbr AS team, AVG(${selectedPeriod}) AS average_score FROM team_score` +
      ' WHERE team_abbr = $1 AND week > $2 GROUP BY team_abbr'
      pool.query(scoreQueryText, [teamAlias, byeWeek])
        .then((result) => {
          res.status(200).send(result.rows)
        })
        .catch((error) => {
          console.log(`Error requesting score data: ${error}`)
          res.status(404).send(`Unable to find data for ${teamAlias} in period ${inputPeriod}.\r\nPlease verify team and period provided.`)
        })
    })
    .catch((error) => {
      console.log(`Error in score.route when provided Team: ${teamAlias} and Period: ${inputPeriod}: ${error}`)
      res.sendStatus(500)
    })
})

module.exports = router
