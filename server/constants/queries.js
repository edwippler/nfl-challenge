exports.venueQuery = 'INSERT INTO venue (id, site_city, site_fullname, site_state, roof_type)' +
' VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING'

exports.seasonInsertQuery = 'INSERT INTO season (game_id, game_date, game_key, game_time_eastern, game_time_local, game_type,' +
' home_display_name, home_nickname, home_team_abbr, home_team_id, iso_time, network_channel, ngs_game, season, season_type,' +
' site_id, visitor_display_name, visitor_nickname, visitor_team_abbr, visitor_team_id, week, week_name, week_name_abbr, score, validated, released_to_clubs)' +
' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24. $25)' +
' ON CONFLICT (game_id) DO NOTHING'