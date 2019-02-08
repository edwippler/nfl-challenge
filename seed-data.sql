-- Table creation and team seed data queries using the url below as data source
-- https://api.ngs.nfl.com/league/schedule?season=2018&seasonType=REG

CREATE TABLE teams(
  id                     INTEGER
  ,abbr                  VARCHAR(30) PRIMARY KEY
  ,city_state            VARCHAR(30)
  ,full_name             VARCHAR(30)
  ,nick                  VARCHAR(30)
  ,team_type             VARCHAR(30)
  ,conference_abbr       VARCHAR(30)
  ,division_abbr         VARCHAR(30)
);

INSERT INTO teams(id, abbr, city_state, full_name, nick, team_type, conference_abbr, division_abbr) 
VALUES (3900,'PIT','Pittsburgh','Pittsburgh Steelers','Steelers','TEAM','AFC','ACN'),
(0325,'BAL','Baltimore','Baltimore Ravens','Ravens','TEAM','AFC','ACN'),
(0610,'BUF','Buffalo','Buffalo Bills','Bills','TEAM','AFC','ACE'),
(3700,'PHI','Philadelphia','Philadelphia Eagles','Eagles','TEAM','NFC','NCE'),
(0200,'ATL','Atlanta','Atlanta Falcons','Falcons','TEAM','NFC','NCS'),
(1050,'CLE','Cleveland','Cleveland Browns','Browns','TEAM','AFC','ACN'),
(2700,'MIA','Miami','Miami Dolphins','Dolphins','TEAM','AFC','ACE'),
(2100,'TEN','Tennessee','Tennessee Titans','Titans','TEAM','AFC','ACS'),
(2200,'IND','Indianapolis','Indianapolis Colts','Colts','TEAM','AFC','ACS'),
(0920,'CIN','Cincinnati','Cincinnati Bengals','Bengals','TEAM','AFC','ACN'),
(0750,'CAR','Carolina','Carolina Panthers','Panthers','TEAM','NFC','NCS'),
(5110,'WAS','Washington','Washington Redskins','Redskins','TEAM','NFC','NCE'),
(1400,'DEN','Denver','Denver Broncos','Broncos','TEAM','AFC','ACW'),
(4600,'SEA','Seattle','Seattle Seahawks','Seahawks','TEAM','NFC','NCW'),
(3800,'ARI','Arizona','Arizona Cardinals','Cardinals','TEAM','NFC','NCW'),
(2120,'HOU','Houston','Houston Texans','Texans','TEAM','AFC','ACS'),
(1800,'GB','Green Bay','Green Bay Packers','Packers','TEAM','NFC','NCN'),
(2520,'OAK','Oakland','Oakland Raiders','Raiders','TEAM','AFC','ACW'),
(2510,'LA','Los Angeles Rams','Los Angeles Rams','Rams','TEAM','NFC','NCW'),
(2310,'KC','Kansas City','Kansas City Chiefs','Chiefs','TEAM','AFC','ACW'),
(4500,'SF','San Francisco','San Francisco 49ers','49ers','TEAM','NFC','NCW'),
(1540,'DET','Detroit','Detroit Lions','Lions','TEAM','NFC','NCN'),
(2250,'JAX','Jacksonville','Jacksonville Jaguars','Jaguars','TEAM','AFC','ACS'),
(3200,'NE','New England','New England Patriots','Patriots','TEAM','AFC','ACE'),
(4900,'TB','Tampa Bay','Tampa Bay Buccaneers','Buccaneers','TEAM','NFC','NCS'),
(1200,'DAL','Dallas','Dallas Cowboys','Cowboys','TEAM','NFC','NCE'),
(3430,'NYJ','New York Jets','New York Jets','Jets','TEAM','AFC','ACE'),
(3410,'NYG','New York Giants','New York Giants','Giants','TEAM','NFC','NCE'),
(0810,'CHI','Chicago','Chicago Bears','Bears','TEAM','NFC','NCN'),
(4400,'LAC','Los Angeles Chargers','Los Angeles Chargers','Chargers','TEAM','AFC','ACW'),
(3300,'NO','New Orleans','New Orleans Saints','Saints','TEAM','NFC','NCS'),
(3000,'MIN','Minnesota','Minnesota Vikings','Vikings','TEAM','NFC','NCN');

CREATE TABLE venue(
  id              INTEGER PRIMARY KEY
  ,site_city      VARCHAR(30)
  ,site_fullname  VARCHAR(50)
  ,site_state     VARCHAR(30)
  ,roof_type      VARCHAR(30)
);

CREATE TABLE season(
  game_id                     BIGINT PRIMARY KEY
  ,game_date                  DATE 
  ,game_key                   INTEGER 
  ,game_time_eastern          VARCHAR(30)
  ,game_time_local            VARCHAR(30)
  ,game_type                  VARCHAR(30)
  ,home_display_name          VARCHAR(30)
  ,home_nickname              VARCHAR(30)
  ,home_team_abbr             VARCHAR(30) REFERENCES teams(abbr)
  ,home_team_id               INTEGER 
  ,iso_time                   BIGINT 
  ,network_channel            VARCHAR(30)
  ,ngs_game                   BOOLEAN
  ,season                     INTEGER 
  ,season_type                VARCHAR(30)
  ,site_id                    INTEGER
  ,visitor_display_name       VARCHAR(30)
  ,visitor_nickname           VARCHAR(30)
  ,visitor_team_abbr          VARCHAR(30) REFERENCES teams(abbr)
  ,visitor_team_id            INTEGER 
  ,week                       INTEGER 
  ,week_name                  VARCHAR(30)
  ,week_name_abbr             VARCHAR(30)
  ,score                      JSONB 
  ,validated                  BOOLEAN 
  ,released_to_clubs          BOOLEAN     
);

CREATE TABLE team_score(
id                  SERIAL PRIMARY KEY
,team_abbr          VARCHAR(30)
,season_year        SMALLINT
,week               SMALLINT
,point_ot           SMALLINT
,point_q1           SMALLINT
,point_q2           SMALLINT
,point_q3           SMALLINT
,point_q4           SMALLINT
,point_total        SMALLINT
,timeouts_remaining SMALLINT
);
