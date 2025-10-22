# from models import User, WasteLog, Reward, RecyclingCenter
# from database import db

# def get_user_dashboard_data(user_id):
#     """
#     Returns all the dashboard statistics for a specific user.
#     This includes total waste recycled, CO2 saved, reward points,
#     total entries, and other personalized stats.
#     """
#     user = User.query.get(user_id)
#     if not user:
#         return None

#     # Use helper from the model
#     return user.to_dashboard_dict()


# def get_global_dashboard_data():
#     """
#     Returns global dashboard statistics across all users.
#     Useful for displaying community or platform-wide impact.
#     """
#     total_waste = db.session.query(db.func.sum(WasteLog.weight)).scalar() or 0
#     total_co2 = db.session.query(db.func.sum(WasteLog.co2_saved)).scalar() or 0
#     total_users = User.query.count()
#     total_entries = WasteLog.query.count()
#     total_points = db.session.query(db.func.sum(Reward.points)).scalar() or 0
#     total_centers = RecyclingCenter.query.count()

#     return {
#         "total_waste_recycled": round(total_waste, 2),
#         "total_co2_saved": round(total_co2, 2),
#         "total_users": total_users,
#         "total_entries": total_entries,
#         "total_points_awarded": total_points,
#         "recycling_centers": total_centers
#     }


# def get_top_recyclers(limit=5):
#     """
#     Returns a list of top recyclers based on total waste weight.
#     """
#     results = (
#         db.session.query(User, db.func.sum(WasteLog.weight).label('total_weight'))
#         .join(WasteLog)
#         .group_by(User.id)
#         .order_by(db.desc('total_weight'))
#         .limit(limit)
#         .all()
#     )

#     top_users = []
#     for user, total_weight in results:
#         top_users.append({
#             "id": user.id,
#             "name": user.name,
#             "email": user.email,
#             "total_weight": round(total_weight or 0, 2)
#         })
#     return top_users


# def get_recent_waste_logs(limit=5):
#     """
#     Returns the most recent waste logs for the dashboard.
#     """
#     logs = (
#         WasteLog.query
#         .order_by(WasteLog.date.desc())
#         .limit(limit)
#         .all()
#     )

#     return [{
#         "id": log.id,
#         "waste_type": log.waste_type,
#         "weight": log.weight,
#         "user_id": log.user_id,
#         "image_url": log.image_url,
#         "date": log.date.isoformat() if log.date else None,
#         "status": log.collection_status
#     } for log in logs]


# services/dashboard_service.py

from models import User  # example if you're fetching real data from DB
# You can import other models like WasteEntry if you have them

def get_dashboard_stats():
    """
    Returns basic statistics to display on the dashboard.
    This can later be expanded to pull real data from the database.
    """
    try:
        # Example: count users from the database
        total_users = User.query.count()

        # For now, let’s hardcode some extra stats — later you can fetch from DB
        total_waste_collected = 560
        recycled_items = 230
        co2_saved = 45.6

        return {
            'total_users': total_users,
            'total_waste_collected': total_waste_collected,
            'recycled_items': recycled_items,
            'co2_saved': co2_saved
        }
    except Exception as e:
        print(f"Dashboard service error: {e}")
        return {
            'total_users': 0,
            'total_waste_collected': 0,
            'recycled_items': 0,
            'co2_saved': 0
        }
