/**
 * Module dependencies
 */
const https = require('https')
const pool = require('../modules/pool')
const queries = require('../constants/queries')
const dataUrl = 'https://api.ngs.nfl.com/league/schedule?season=2018&seasonType=REG'

console.log('data migration utility invoked')

/**
 * Retrieve data from url and populate database with values
 */
https.get(dataUrl, response => {
  response.setEncoding('utf8')
  let rawData = ''
  response.on('data', chunk => {
    rawData += chunk
  })
  response.on('end', () => {
    try {
      const data = JSON.parse(rawData)
      for (i = 0; i < data.length; i++) {
        let game = data[i]
        let venue = game.site
        let venueParams = [venue.siteId, venue.siteCity, venue.siteFullname, venue.siteState, venue.roofType]
        // This should be outside of the for loop to improve efficiency, but running into errors when trying to be clever
        pool.query(queries.venueQuery, venueParams).then((result) => {
          // console.log(Success)
        }) .catch((error) => {
          console.log(`Error in promise ${error}`)
        })
      }
    } catch (error) {
      console.log(`The following error occurred during data migration script: ${error}`)
    }
  })
})
