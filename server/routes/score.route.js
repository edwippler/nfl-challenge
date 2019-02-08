/**
 * Module dependencies
 */
const router = require('express').Router()
const pool = require('../modules/pool')
const queries = require('../constants/queries')

// Score Section
router.get('/averageSinceBye/:team', (req, res) => {
  let teamAlias = req.params.team
  let periodSpecified = req.query.period
  // TODO: make period and bye week dynamic
  let scoreQueryText = 'SELECT AVG(point_total) AS average FROM team_score WHERE team_abbr = $1 AND week > $2;'

  pool.query(queries.getTeamByeWeekQuery, [teamAlias])
    .then((result) => {
      // console.log(`Period desired: ${periodSpecified}`)
      let byeWeek = result.rows[0].bye_week
      pool.query(scoreQueryText, [teamAlias, byeWeek])
        .then((result) => {
          res.send(result.rows)
        })
        .catch((error) => {
          console.log(`Error requesting score data: ${error}`)
          res.sendStatus(500).send(`Unable to get average score for ${teamAlias}.`)
        })
    })
    .catch((error) => {
      console.log(`Error in score.route when provided Team: ${teamAlias} and Period: ${periodSpecified}: ${error}`)
      res.sendStatus(500)
    })
})

module.exports = router
