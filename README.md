# NFL-challenge

The goal of this exercise is to create an end-to-end Proof-of-Concept for an NFL data API, which will aggregate season data based on various parameters and return it as JSON to the caller.

## Run Local Instructions:
#### Prerequisites
Node installed on local machine  
PostreSQL installed on local machine
#### To Install
Clone repo  
Install dependencies using `npm install`  
Run these commands to set up the database:`createdb sport_app` && `psql -h localhost -d sport_app -p 5432 -f {path to SQL script}/seed-data.sql`  
Seed data using `npm run data-migration` (this step may take up to a minute)

## Built With:
* Node.js
* Express
* PostreSQL 

## Author:
Edmund Wippler