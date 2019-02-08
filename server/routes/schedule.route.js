/**
 * Module dependencies
 */
const router = require('express').Router()
const pool = require('../modules/pool')

// Bye Section
router.get('/bye', (req, res) => {
  let teamAlias = req.query.team
  // Use previous year as default if no year specified
  let year = req.query.year || (new Date().getFullYear() - 1)
  let queryText = 'SELECT s.week AS bye_week FROM generate_series(1,17) s(week)' +
  ' WHERE NOT EXISTS (SELECT 1, teams.city_state AS team FROM season' +
  ' JOIN teams ON (season.home_team_abbr = teams.abbr OR season.visitor_team_abbr = teams.abbr)' +
  ' WHERE teams.abbr = $1 AND week = s.week)'
  pool.query(queryText, [teamAlias])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.log(`Error in schedule.route when provided Team: ${teamAlias} and Year: ${year}: ${error}`)
      res.sendStatus(500)
    })
})

module.exports = router
