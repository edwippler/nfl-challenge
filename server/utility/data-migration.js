/**
 * Module dependencies
 */
const https = require('https')
const pool = require('../modules/pool')
const queries = require('../constants/queries')
let self = this


// Simple message to indicate process started
console.log('Data migration utility invoked')

self.initialize = () => {
  let seasonInputs = [2017, 2018]
  for (let i = 0; i < seasonInputs.length; i++) {
    let seasonYear = seasonInputs[i]
    const baseUrl = `https://api.ngs.nfl.com/league/schedule?season=${seasonYear}&seasonType=REG`
    self.executeDataFetch(baseUrl)
  }
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
 * Function to populate visitor score data
 */
self.seedVisitorScore = (game) => {
  const visitorScore = game.score.visitorTeamScore
  let visitorScoreParams = [
    game.visitorTeamAbbr,
    game.season,
    game.week,
    visitorScore.pointOT,
    visitorScore.pointQ1,
    visitorScore.pointQ2,
    visitorScore.pointQ3,
    visitorScore.pointQ4,
    visitorScore.pointTotal,
    visitorScore.timeoutsRemaining
  ]
  // execute query
  pool.query(queries.scoreInsertQuery, visitorScoreParams)
    .then((result) => {
      // console.log(`Success adding visitor score`)
    })
    .catch((error) => {
      console.log(`Error inserting visitor score: ${error}`)
    })
}

/**
 * Function to populate home score data
 */
self.seedHomeScore = (game) => {
  const homeScore = game.score.homeTeamScore
  let homeScoreParams = [
    game.homeTeamAbbr,
    game.season,
    game.week,
    homeScore.pointOT,
    homeScore.pointQ1,
    homeScore.pointQ2,
    homeScore.pointQ3,
    homeScore.pointQ4,
    homeScore.pointTotal,
    homeScore.timeoutsRemaining
  ]
  // execute query
  pool.query(queries.scoreInsertQuery, homeScoreParams)
    .then((result) => {
      // console.log(`Success adding home score`)
    })
    .catch((error) => {
      console.log(`Error inserting home score: ${error}`)
    })
}

/**
 * Wrapper function for populating score data for both teams
 * IMPORTANT: Score data query current does not protect against duplicate entries
 */
self.seedScoreData = (game) => {
  self.seedVisitorScore(game)
  self.seedHomeScore(game)
}

/**
 * Main funciton to retrieve data from url and populate database with values
 * Note: fix spacing
 */
self.executeDataFetch = (dataUrl) => {
https.get(dataUrl, response => {
  response.setEncoding('utf8')
  let rawData = ''
  response.on('data', chunk => {
    rawData += chunk
  })
  response.on('end', () => {
    const data = JSON.parse(rawData)
    for (let i = 0; i < data.length; i++) {
      let gameData = data[i]
      self.seedSeasonData(gameData)
      self.seedScoreData(gameData)
      // Limit queue to ensure not saturing DB connections - bluebird library -> promise.map
    }
  })
})
}

self.initialize()
