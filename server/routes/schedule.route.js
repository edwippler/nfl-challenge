/**
 * Module dependencies
 */
const router = require('express').Router()
const pool = require('../modules/pool')
const queries = require('../constants/queries')
const self = this

/**
 * Helper function to dynamically build query params
 */
self.buildQueryParams = (team, year) => {
  let params = []
  if (team) {
    params.push(team)
  }
  params.push(year)
  return params
}

/**
 * Helper function to dynamically set query text
 * based on if a team is provided
 */
self.setQueryText = (team) => {
  let text = queries.getByeWeeks
  if (team) {
    text = queries.getTeamByeWeekWithYearQuery
  }
  return text
}

/**
 * Main function to return bye data
 */
router.get('/bye', (req, res) => {
  let teamAlias = req.query.team
  // Use previous year as default if no year specified
  let year = req.query.year || (new Date().getFullYear() - 1)
  let queryText = self.setQueryText(teamAlias)
  let queryParams = self.buildQueryParams(teamAlias, year)

  pool.query(queryText, queryParams)
    .then((result) => {
      res.status(200).send(result.rows)
    })
    .catch((error) => {
      console.log(`Error in schedule.route when provided Team: ${teamAlias} and Year: ${year}: ${error}`)
      res.status(404).send(`Unable to find bye week data`)
    })
})

module.exports = router
