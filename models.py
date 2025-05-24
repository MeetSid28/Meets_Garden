from app import db
from datetime import datetime, date
from sqlalchemy import func

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    completed = db.Column(db.Boolean, default=False)
    flower_type = db.Column(db.String(20), default='rose')  # 'rose' or 'tulip'
    flower_bucks = db.Column(db.Integer, default=5)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)

class Achievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    badge_icon = db.Column(db.String(50))
    unlocked = db.Column(db.Boolean, default=False)
    unlocked_at = db.Column(db.DateTime)

class UserStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_flower_bucks = db.Column(db.Integer, default=0)
    current_streak = db.Column(db.Integer, default=0)
    last_login = db.Column(db.Date)
    total_tasks_completed = db.Column(db.Integer, default=0)
    garden_decorations = db.Column(db.Text, default='{}')  # JSON string
    authenticated = db.Column(db.Boolean, default=False)

class DailyLogin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login_date = db.Column(db.Date, default=date.today)
    flower_grown = db.Column(db.String(50))  # Type of flower that grew
