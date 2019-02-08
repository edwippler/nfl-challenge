/**
 * Module dependencies
 */
const https = require('https')
const pool = require('../modules/pool')
const queries = require('../constants/queries')
const dataUrl = 'https://api.ngs.nfl.com/league/schedule?season=2018&seasonType=REG'
let self = this;

// Simple message to indicate process started
console.log('Data migration utility invoked')

/**
 * Function to populate venue data into the database
 * Note: Could be more efficient using a bulk query,
 * but running into limitations with pg module
 */
self.seedVenueDataIfMissing = (venue) => {
    // venue properties
    let venueParams = [
      venue.siteId,
      venue.siteCity,
      venue.siteFullname,
      venue.siteState,
      venue.roofType
    ]
    // execute insert query
    pool.query(queries.venueQuery, venueParams)
    .then((result) => {
      // console.log('Success running venue query)
    }) 
    .catch((error) => {
      console.log(`Error in promise ${error}`)
    })
}

/**
 * Function to populate the season data
 */
self.seedSeasonData = (game) => {
    // season properties
    let seasonParams = [
      game.gameId,
      game.gameDate,
      game.gameKey,
      game.gameTimeEastern,
      game.gameTimeLocal,
      game.gameType,
      game.homeDisplayName,
      game.homeNickname,
      game.homeTeamAbbr,
      game.homeTeamId,
      game.isoTime,
      game.networkChannel,
      game.ngsGame,
      game.season,
      game.seasonType,
      game.site.siteId,
      game.visitorDisplayName,
      game.visitorNickname,
      game.visitorTeamAbbr,
      game.visitorTeamId,
      game.week,
      game.weekName,
      game.weekNameAbbr,
      game.score,
      game.validated,
      game.releasedToClubs
    ]
    // execute query
    pool.query(queries.seasonInsertQuery, seasonParams)
    .then((result) => {
      // console.log('Success inserting into seasons')
    })
    .catch((error) => {
      console.log(`Error inserting into seasons: ${error}`)
    })
}

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
    const data = JSON.parse(rawData)
    for (i = 0; i < data.length; i++) {
      let gameData = data[i]
      self.seedVenueDataIfMissing(gameData.site)
      self.seedSeasonData(gameData)
    }
  })
})
