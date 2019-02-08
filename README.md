# NFL-challenge

The goal of this exercise is to create an end-to-end Proof-of-Concept for an NFL data API, which will aggregate season data based on various parameters and return it as JSON to the caller.

## GET /score/averageSinceBye/{teamAbbreviation}[?period={optionalPeriod}]
If no period is specified, the average returned will be based on the total score.  
Response 200: JSON describing team and average score.tExample: <br>
`{"team": "NO","average_score": "5"}` <br>
Response 404: No data found for team/period combination

## Run Local Instructions:
#### Prerequisites
Node installed on local machine  
PostreSQL installed on local machine (A PostgreSQL client such as Postico may be useful as well)
#### To install on a local PC running macOS
Clone repo  
Install dependencies using `npm install`  
Run this command once to set up the database:`createdb sport_app && psql -h localhost -d sport_app -p 5432 -f {path to SQL script}/seed-data.sql`  
Seed data using `npm run data-migration` (this step may take up to a minute)  
Start server using `npm start`  
You can browse the API endpoints at http://localhost:5000

## Built With:
* Node.js
* Express
* PostreSQL 

## Author:
Edmund Wippler