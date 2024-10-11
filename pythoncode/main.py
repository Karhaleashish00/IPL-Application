from datetime import datetime

from flask_cors import CORS
from flask import Flask, jsonify, redirect, url_for, request
from flask_pymongo import PyMongo
import sys

from pymongo import UpdateOne

# Increase recursion limit
sys.setrecursionlimit(2500)

app = Flask(__name__)
CORS(app)



# Accessing the collection
matchs_collection = mongo.db.IPLMatches  # Correct way to access the collection
stats_collection = mongo.db.IPLStatistics
seassion_collections = [
        "seassion2008", "seassion2009", "seassion2010", "seassion2011", "seassion2012",
        "seassion2013", "seassion2014", "seassion2015", "seassion2016", "seassion2017",
        "seassion2018", "seassion2019", "seassion2020", "seassion2021", "seassion2022",
        "seassion2023", "seassion2024"
    ]
seassion2008_collection = mongo.db.seassion2024


def start(first_match):
    teams = {
        "team1": "",
        "team2": ""
    }
    players = {}

    for ball in first_match:
        if teams['team1'] == "":
            teams['team1'] = ball['batting_team']
            teams['team2'] = ball['bowling_team']

        if ball['batter'] not in players.keys():
            # print(ball['over'],ball['ball'])
            player = {
                'name': "",
                'runs': 0,
                'team': "",
                'balls': 0,
                'fours': 0,
                'sixes': 0,
                'opponent': "",
                'dismissed': "",
                'dismissed_type': "",
                'fielder': "",
                'wicket_taker': "",
                'bowling': {
                    'runs': 0,
                    'balls': 0,
                    'wickets': 0
                }
            }
            if player['name'] == "":
                player['name'] = ball['batter']
                player['team'] = ball['batting_team']
                player['opponent'] = ball['bowling_team']

            players.update({player['name']: player})
        if ball['bowler'] not in players.keys():
            player = {
                'name': "",
                'runs': 0,
                'team': "",
                'balls': 0,
                'fours': 0,
                'sixes': 0,
                'opponent': "",
                'dismissed': "",
                'dismissed_type': "",
                'fielder': "",
                'wicket_taker': "",
                'bowling': {
                    'runs': 0,
                    'balls': 0,
                    'wickets': 0
                }
            }
            if player['name'] == "":
                player['name'] = ball['bowler']
                player['opponent'] = ball['batting_team']
                player['team'] = ball['bowling_team']

            players.update({player['name']: player})

        if ball['player_dismissed'] == "NA":
            players[ball['batter']]['runs'] += ball['batsman_runs']
            if ball['extra_runs'] != 0:
                if ball['extras_type'] == "legbyes" or ball['extras_type'] == "byes":
                    players[ball['bowler']]['bowling']['balls'] += 1
                else:
                    players[ball['bowler']]['bowling']['runs'] += ball['total_runs']
            else:
                players[ball['bowler']]['bowling']['runs'] += ball['total_runs']
                players[ball['bowler']]['bowling']['balls'] += 1

            if ball['batsman_runs'] == 4:
                players[ball['batter']]['fours'] += 1
            elif ball['batsman_runs'] == 6:
                players[ball['batter']]['sixes'] += 1
        else:
            if ball['dismissal_kind'] != "run out" or ball['dismissal_kind'] != "hit wicket":
                players[ball['bowler']]['bowling']['runs'] += ball['total_runs']
                players[ball['bowler']]['bowling']['balls'] += 1
                players[ball['bowler']]['bowling']['wickets'] += 1

            players[ball['batter']]['dismissed_type'] = ball['dismissal_kind']
            players[ball['batter']]['dismissed'] = "Yes"
            players[ball['batter']]['fielder'] = ball["fielder"]
            players[ball['batter']]['wicket_taker'] = ball['bowler']
            players[ball['batter']]['balls'] += 1

        # if ball['bowler'] in players[ball['batter']]['bowlers'].keys():
        #     # print("if exist", players[ball['batter']]['bowlers'].keys())
        #     players[ball['batter']]['bowlers'][ball['bowler']] += ball['batsman_runs']
        # else:
        #     # print(players[ball['batter']]['bowlers'])
        #     players[ball['batter']]['bowlers'].update({ball['bowler']: ball['batsman_runs']})

        if ball['extra_runs'] == 0 or ball["extras_type"] == "legbyes":
            players[ball['batter']]['balls'] += 1

        ball['_id'] = str(ball['_id'])
    return {'players': players, 'teams': teams}  # Return as JSON respons


# @app.route("/updateseassion", methods=['GET', 'POST'])
def updateseassion():
    Matches = list(matchs_collection.find({"season": 2024}))
    Matches_List = []
    for match in Matches:
        match['_id'] = str(match['_id'])
        Matches_List.append(match)

    all_matches = []
    for match in Matches_List:
        scorecard = {
            'team1': {
                "team_name": "",
                "players": {

                }
            },
            'team2': {
                "team_name": "",
                "players": {

                }
            },
            'date': "",
            'venue': "",
            'seassion': "",
            'match_id': ""
        }
        match_res = list(stats_collection.find({'match_id': match['id']}))
        match_data = start(match_res)

        scorecard['team1']['team_name'] = match_data['teams']['team1']
        scorecard['team2']['team_name'] = match_data['teams']['team2']
        scorecard['date'] = match['date']
        scorecard['seassion'] = match['season']
        scorecard['match_id'] = match['id']
        scorecard['venue'] = match['venue']

        for name, player in match_data['players'].items():
            if player['team'] == scorecard['team1']['team_name']:
                scorecard['team1']['players'].update({name: player})
            else:
                scorecard['team2']['players'].update({name: player})
        all_matches.append(scorecard)

    return all_matches


@app.route("/modify-seassion2008", methods=['GET', 'POST'])
def modify_seassion2008():
    # Example match data structure
    match_data_list = list(updateseassion())

    for match_data in match_data_list:

        # Parse the match date
        match_date = match_data['date']

        # Update team1 players (e.g., Kolkata Knight Riders)
        team1_name = match_data['team1']['team_name']
        for player_name, stats in match_data['team1']['players'].items():
            match_details = {
                "date": match_date,
                "venue": match_data['venue'],
                "match_details": stats  # Store full stats for this match without modification
            }

            # Update cumulative stats and match-specific data for each player
            seassion2008_collection.update_one(
                {f"{team1_name}": {"$exists": True}},
                {
                    "$inc": {
                        f"{team1_name}.{player_name}.total_runs": stats['runs'],
                        f"{team1_name}.{player_name}.total_balls": stats['balls'],
                        f"{team1_name}.{player_name}.total_wickets": stats['bowling']['wickets'],
                        f"{team1_name}.{player_name}.total_fours": stats['fours'],
                        f"{team1_name}.{player_name}.total_sixes": stats['sixes'],
                        f"{team1_name}.{player_name}.total_balls_bowled": stats['bowling']['balls'],
                        f"{team1_name}.{player_name}.total_runs_conceded": stats['bowling']['runs']
                    },
                    "$set": {
                        f"{team1_name}.{player_name}.matches.{match_data['match_id']}": match_details
                    }
                },
                upsert=True
            )

        # Update team2 players (e.g., Royal Challengers Bangalore)
        team2_name = match_data['team2']['team_name']
        for player_name, stats in match_data['team2']['players'].items():
            match_details = {
                "date": match_date,
                "venue": match_data['venue'],
                "match_details": stats  # Store full stats for this match without modification
            }

            # Update cumulative stats and match-specific data for each player
            seassion2008_collection.update_one(
                {f"{team2_name}": {"$exists": True}},
                {
                    "$inc": {
                        f"{team2_name}.{player_name}.total_runs": stats['runs'],
                        f"{team2_name}.{player_name}.total_balls": stats['balls'],
                        f"{team2_name}.{player_name}.total_wickets": stats['bowling']['wickets'],
                        f"{team2_name}.{player_name}.total_fours": stats['fours'],
                        f"{team2_name}.{player_name}.total_sixes": stats['sixes'],
                        f"{team2_name}.{player_name}.total_balls_bowled": stats['bowling']['balls'],
                        f"{team2_name}.{player_name}.total_runs_conceded": stats['bowling']['runs']
                    },
                    "$set": {
                        f"{team2_name}.{player_name}.matches.{match_data['match_id']}": match_details
                    }
                },
                upsert=True
            )

    return jsonify({"message": "Match data inserted successfully!"})

@app.route("/playersCount",methods=['GET','POST'])
def playersCount():
    all_sessions = []
    for collection in seassion_collections:
        projection = {"password": 0}  # Exclude the "password" field
        data = mongo.db[collection].find({}, projection)  # Correctly apply projection
        # Iterate over the cursor to extract documents
        for season in data:
            if isinstance(season, dict):  # Ensure the season is a dictionary
                for team, players in season.items():
                    if isinstance(players, dict):  # Ensure players is a dictionary
                        for player_name, player_data in players.items():
                            if isinstance(player_data, dict):  # Ensure player_data is a dictionary
                                for match_id, match_info in player_data["matches"].items():
                                    if isinstance(match_info, dict):  # Ensure match_info is a dictionary
                                        match_date = match_info["date"]
                                        year = match_date.year
                                        new_entry = {
                                            "player_name": match_info["match_details"]["name"],  # Player's name
                                            "team": team,  # Team name
                                            "year": year  # Match year
                                        }

                                        # Check for duplicate entries in the list
                                        if not any(existing_entry for existing_entry in all_sessions
                                                   if (existing_entry["player_name"] == new_entry["player_name"] and
                                                       existing_entry["team"] == new_entry["team"] and
                                                       existing_entry["year"] == new_entry["year"])):
                                            all_sessions.append(new_entry)
    player_collection = mongo.db.players

    # Prepare bulk operations
    bulk_operations = []
    for player in all_sessions:
        bulk_operations.append(
            UpdateOne(
                {"player_name": player["player_name"], "team": player["team"], "year": player["year"]},  # Filter
                {"$set": player},  # Update
                upsert=True  # Insert if not exists
            )
        )

    # Execute the bulk write operation
    result = player_collection.bulk_write(bulk_operations)
    return jsonify(all_sessions)


@app.route("/get-player/<player_name>/<int:year>", methods=['GET', 'POST'])
def get_player(player_name,year):
    # Find the player in MongoDB
    team_cursor = mongo.db.players.find({'player_name': player_name, 'year': year}, {'team': 1, '_id': 0})

    # Convert the cursor to a list of documents
    team_list = list(team_cursor)

    # Return the result as JSON
    return jsonify(team_list)


@app.route("/pla-csk", methods=['GET'])
def get_csk_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    csk_players = mongo.db.images.find_one({}, {"IPL 2024.Chennai Super Kings": 1, "_id": 0})

    if csk_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(csk_players["IPL 2024"]["Chennai Super Kings"])
    else:
        return jsonify({"error": "No data found"}), 404

@app.route("/pla-dc", methods=['GET'])
def get_dc_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    dc_players = mongo.db.images.find_one({}, {"IPL 2024.Delhi Capitals": 1, "_id": 0})

    if dc_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(dc_players["IPL 2024"]["Delhi Capitals"])
    else:
        return jsonify({"error": "No data found"}), 404

@app.route("/pla-gt", methods=['GET'])
def get_gt_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    gt_players = mongo.db.images.find_one({}, {"IPL 2024.Gujarat Titans": 1, "_id": 0})

    if gt_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(gt_players["IPL 2024"]["Gujarat Titans"])
    else:
        return jsonify({"error": "No data found"}), 404

@app.route("/pla-kkr", methods=['GET'])
def get_kkr_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    kkr_players = mongo.db.images.find_one({}, {"IPL 2024.Kolkata Knight Riders": 1, "_id": 0})

    if kkr_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(kkr_players["IPL 2024"]["Kolkata Knight Riders"])
    else:
        return jsonify({"error": "No data found"}), 404

@app.route("/pla-lsg", methods=['GET'])
def get_lsg_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    lsg_players = mongo.db.images.find_one({}, {"IPL 2024.Lucknow Super Giants": 1, "_id": 0})

    if lsg_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(lsg_players["IPL 2024"]["Lucknow Super Giants"])
    else:
        return jsonify({"error": "No data found"}), 404

@app.route("/pla-mi", methods=['GET'])
def get_mi_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    mi_players = mongo.db.images.find_one({}, {"IPL 2024.Mumbai Indians": 1, "_id": 0})

    if mi_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(mi_players["IPL 2024"]["Mumbai Indians"])
    else:
        return jsonify({"error": "No data found"}), 404

@app.route("/pla-pbks", methods=['GET'])
def get_pbks_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    pbks_players = mongo.db.images.find_one({}, {"IPL 2024.Punjab Kings": 1, "_id": 0})

    if pbks_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(pbks_players["IPL 2024"]["Punjab Kings"])
    else:
        return jsonify({"error": "No data found"}), 404

@app.route("/pla-rr", methods=['GET'])
def get_rr_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    rr_players = mongo.db.images.find_one({}, {"IPL 2024.Rajasthan Royals": 1, "_id": 0})

    if rr_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(rr_players["IPL 2024"]["Rajasthan Royals"])
    else:
        return jsonify({"error": "No data found"}), 404


@app.route("/pla-rcb", methods=['GET'])
def get_rcb_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    rcb_players = mongo.db.images.find_one({}, {"IPL 2024.Royal Challengers Bengaluru": 1, "_id": 0})

    if rcb_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(rcb_players["IPL 2024"]["Royal Challengers Bengaluru"])
    else:
        return jsonify({"error": "No data found"}), 404

@app.route("/pla-srh", methods=['GET'])
def get_srh_players():
    # Find the document where IPL2024's key is "Chennai Super Kings"
    srh_players = mongo.db.images.find_one({}, {"IPL 2024.Sunrisers Hyderabad": 1, "_id": 0})

    if srh_players:
        # Extracting only the Chennai Super Kings' players data
        return jsonify(srh_players["IPL 2024"]["Sunrisers Hyderabad"])
    else:
        return jsonify({"error": "No data found"}), 404

@app.route("/addMatch", methods=['POST'])
def addMatch():
    data = request.json
    # Ensure the necessary data exists in the request
    if not data or "myteam" not in data or "specialization" not in data or "name" not in data:
        return jsonify({"error": "Missing required parameters"}), 400

    # Create a match history dictionary from the data
    match_history = {
        "out or not": data.get("out or not", ""),
        "wicketType": data.get("wicketType", ""),
        "runs": data.get("runs", ""),
        "bowls": data.get("bowls", ""),
        "catchby": data.get("catchby", ""),
        "outby": data.get("outby", ""),
        "bowlingType": data.get("bowlingType", ""),
        "opponent": data.get("opponent", ""),
        "gound": data.get("gound", ""),
        "runoutby": data.get("runoutby", ""),
        "stumpedby": data.get("stumpedby", ""),
        "wicketdesc": data.get("wicketdesc", ""),
        "date": data.get("date", ""),
        "seassion": data.get("seassion", ""),
        "myteam": data.get("myteam", ""),
        "fours":data.get("fours",""),
        "sixes":data.get("sixes",""),
        "bowling":data.get("bowling","")
    }

    # Define the team key path based on user input
    if data['specialization'] == "WicketKeeper Batter":
        team_key = f"IPL 2024.{data['myteam']}.Batters"
    elif data['specialization'] == "AllRounder":
        team_key = f"IPL 2024.{data['myteam']}.All Rounders"
    elif data['specialization'] == "Bowler":
        team_key = f"IPL 2024.{data['myteam']}.Bowlers"

    # Check if the player already exists in the Batters array
    player_exists = mongo.db.images.find_one(
        {f"{team_key}.name": data["name"]},
        {f"{team_key}.$": 1}
    )
    if player_exists:
        # Update the player's match history (appending the new match data)
        mongo.db.images.update_one(
            {f"{team_key}.name": data["name"]},  # Find the player
            {
                "$set": {
                    f"{team_key}.$.match history.{data['date']}": match_history  # Update the match history
                }
            }
        )
        return jsonify({"message": "Player's match history updated successfully"}), 200
    else:
        return jsonify({"error": "Player not found"}), 404

@app.route("/get-all-teams",methods=['GET','POST'])
def get_teams():
    response = list(mongo.db.players.aggregate([
              {"$match":{"year":2024}},
              {
                "$group": {
                  "_id": "$team",
                  "players": { "$push": "$player_name" }
                }
              }
            ]))
    return jsonify(response)

@app.route("/get-players-details",methods=['GET','POST'])
def get_players_details():
    teams = {'csk':'Chennai Super Kings',
             'dc':'Delhi Capitals',
             'rcb':'Royal Challengers Bengaluru',
             'pbks':'Punjab Kings',
             'srh':'Sunrisers Hyderabad',
             'rr':'Rajasthan Royals',
             'mi':'Mumbai Indians',
             'lsg':'Lucknow Super Giants',
             'kkr':'Kolkata Knight Riders',
             'gt':'Gujarat Titans'
             }
    data = request.json
    # team_name = teams[data.get('team')] # Expected to send team name in request
    player_name = data.get('player_name')  # Expected to send player name in request

    response = list(mongo.db['test1'].find({"player_name": player_name}))
    response_list = []
    final = {
        "balls_faced_in_match": 0,
        "dismissed_type": {},
        "fours_in_match": 0,
        "ground_performance": {},
        "player_name": "",
        "runs_in_match": 0,
        "sixes_in_match": 0,
        "wicket_taker": {},
        "total_runs_conceded":0,
        "total_balls_bowled":0,
        "wickets_taken":0,
        "matches":0,
        "image_url":""
    }
    for item in response:
        item['_id'] = str(item['_id'])
        response_list.append(item)
    for entry in response_list:
        final['balls_faced_in_match'] += entry['balls_faced_in_match']
        for i in entry['dismissed_type']:
            if i in final['dismissed_type']:
                final['dismissed_type'][i] += entry['dismissed_type'][i]
            else:
                final['dismissed_type'].update({i: entry['dismissed_type'][i]})
        for stadium, stats in entry['ground_performance'].items():
            if stadium in final['ground_performance']:
                final['ground_performance'][stadium]['balls'] += stats['balls']
                final['ground_performance'][stadium]['runs'] += stats['runs']

                # Optional: update dismissal count if it exists
                if 'dismissal' in stats:
                    final['ground_performance'][stadium]['dismissal'] = final['ground_performance'][stadium].get(
                        'dismissal', 0) + stats.get('dismissal', 0)
            else:
                # If the stadium doesn't exist, add it to final
                final['ground_performance'][stadium] = stats.copy()
        for i in entry['wicket_taker']:
            if i in final['wicket_taker']:
                final['wicket_taker'][i] += entry['wicket_taker'][i]
            else:
                final['wicket_taker'].update({i: entry['wicket_taker'][i]})
        final['runs_in_match'] += entry['runs_in_match']
        final['sixes_in_match'] += entry['sixes_in_match']
        final['fours_in_match'] += entry['fours_in_match']
        final['matches'] += entry['matches']
        final['total_runs_conceded'] += entry['total_runs_conceded']
        final['total_balls_bowled'] += entry['total_balls_bowled']
        final['wickets_taken'] += entry['wickets_taken']
        final['image_url'] = entry['image_url']
        if final['player_name'] == "":
            final['player_name'] += entry['player_name']

    return jsonify(final)


# @app.route("/get-player",methods=['GET','POST'])
# def get_player():
#     res = request.json
#     response = list(mongo.db['test'].find({"player_name":res['player_name']}))
#     response_list = []
#     final =  {
#         "balls_faced_in_match": 0,
#         "dismissed_type": {},
#         "fours_in_match": 0,
#         "ground_performance": {},
#         "player_name": "",
#         "runs_in_match": 0,
#         "sixes_in_match": 0,
#         "wicket_taker": {}
#         }
#     for item in response:
#         item['_id'] = str(item['_id'])
#         response_list.append(item)
#     for entry in response_list:
#         final['balls_faced_in_match'] += entry['balls_faced_in_match']
#         for i in entry['dismissed_type']:
#             if i in final['dismissed_type']:
#                 final['dismissed_type'][i] += entry['dismissed_type'][i]
#             else:
#                 final['dismissed_type'].update({i:entry['dismissed_type'][i]})
#         for stadium, stats in entry['ground_performance'].items():
#             if stadium in final['ground_performance']:
#                 final['ground_performance'][stadium]['balls'] += stats['balls']
#                 final['ground_performance'][stadium]['runs'] += stats['runs']
#
#                 # Optional: update dismissal count if it exists
#                 if 'dismissal' in stats:
#                     final['ground_performance'][stadium]['dismissal'] = final['ground_performance'][stadium].get(
#                         'dismissal', 0) + stats.get('dismissal', 0)
#             else:
#                 # If the stadium doesn't exist, add it to final
#                 final['ground_performance'][stadium] = stats.copy()
#         for i in entry['wicket_taker']:
#             if i in final['wicket_taker']:
#                 final['wicket_taker'][i] += entry['wicket_taker'][i]
#             else:
#                 final['wicket_taker'].update({i:entry['wicket_taker'][i]})
#         final['runs_in_match'] += entry['runs_in_match']
#         final['sixes_in_match'] += entry['sixes_in_match']
#         final['fours_in_match'] += entry['fours_in_match']
#         if final['player_name'] == "":
#             final['player_name'] += entry['player_name']
#
#     return jsonify(final)
if __name__ == '__main__':
    app.run(debug=True)
