/**
 * Module dependencies
 */
const pg = require('pg')

/**
 * Configuration object for database connection properties
 */
const config = {
  host: 'localhost',
  port: 5432,
  database: 'sport_app',
  max: 10,
  idleTimeoutMillis: 30000
}

// Create the pool that will be shared by all other modules
const pool = new pg.Pool(config)

/**
 * Debug: Pool will log when it connects to the database
 */
pool.on('connect', () => {
  console.log('Postgesql connected')
})

/**
 * Pool with emit an error on behalf of any idle clients
 * it contains if a backend error or network partition happens
 */
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = pool
