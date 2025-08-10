from flask import jsonify, request
from app import app
from models import Player

@app.route('/api/leaderboard')
def api_leaderboard():
    """API endpoint for leaderboard data with fallback"""
    try:
        sort_by = request.args.get('sort', 'experience')
        limit = min(int(request.args.get('limit', 50)), 100)

        players = Player.get_leaderboard(sort_by=sort_by, limit=limit) or []

        # Convert players to dict format
        players_data = []
        for player in players:
            players_data.append({
                'id': player.id,
                'nickname': player.nickname,
                'level': player.level,
                'experience': player.experience,
                'kills': player.kills,
                'deaths': player.deaths,
                'wins': player.wins,
                'games_played': player.games_played,
                'kd_ratio': player.kd_ratio,
                'win_rate': player.win_rate
            })

        return jsonify({
            'success': True,
            'players': players_data,
            'total': len(players_data)
        })
    except Exception as e:
        app.logger.error(f"Error in API leaderboard: {e}")
        return jsonify({
            'success': False,
            'players': [],
            'total': 0,
            'error': 'Failed to load leaderboard data'
        }), 200  # Still return 200 with empty data

@app.route('/api/stats')
def api_stats():
    """API endpoint for statistics data"""
    try:
        stats = Player.get_statistics()

        # Get chart data
        top_players_exp = Player.get_leaderboard('experience', 10)
        top_players_kills = Player.get_leaderboard('kills', 10)

        # Get level distribution
        all_players = Player.query.all()
        level_distribution = {}
        for player in all_players:
            level_range = f"{(player.level // 10) * 10}-{(player.level // 10) * 10 + 9}"
            level_distribution[level_range] = level_distribution.get(level_range, 0) + 1

        charts_data = {
            'top_players_exp': {
                'labels': [p.nickname for p in top_players_exp],
                'data': [p.experience for p in top_players_exp]
            },
            'top_players_kills': {
                'labels': [p.nickname for p in top_players_kills],
                'data': [p.kills for p in top_players_kills]
            },
            'player_levels': level_distribution
        }

        # Serialize stats properly - remove non-serializable Player objects
        serialized_stats = {
            'total_players': int(stats['total_players']) if stats['total_players'] else 0,
            'total_kills': int(stats['total_kills']) if stats['total_kills'] else 0,
            'total_deaths': int(stats['total_deaths']) if stats['total_deaths'] else 0,
            'total_games': int(stats['total_games']) if stats['total_games'] else 0,
            'total_wins': int(stats['total_wins']) if stats['total_wins'] else 0,
            'total_beds_broken': int(stats['total_beds_broken']) if stats['total_beds_broken'] else 0,
            'total_coins': int(stats['total_coins']) if stats['total_coins'] else 0,
            'total_reputation': int(stats['total_reputation']) if stats['total_reputation'] else 0,
            'average_level': int(stats['average_level']) if stats['average_level'] else 0,
            'average_coins': int(stats['average_coins']) if stats['average_coins'] else 0,
            'average_reputation': int(stats['average_reputation']) if stats['average_reputation'] else 0,
            'top_player': {
                'nickname': stats['top_player'].nickname,
                'experience': stats['top_player'].experience,
                'level': stats['top_player'].level
            } if stats.get('top_player') else None,
            'richest_player': {
                'nickname': stats['richest_player'].nickname,
                'coins': stats['richest_player'].coins
            } if stats.get('richest_player') else None,
            'most_reputable_player': {
                'nickname': stats['most_reputable_player'].nickname,
                'reputation': stats['most_reputable_player'].reputation
            } if stats.get('most_reputable_player') else None
        }

        return jsonify({
            'stats': serialized_stats,
            'charts': charts_data
        })

    except Exception as e:
        app.logger.error(f"Error in API stats: {e}")
        return jsonify({'error': str(e)}), 500