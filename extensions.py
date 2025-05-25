from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)
    with app.app_context():
        # Import models here to avoid circular imports
        from models import Task, Achievement, UserStats, DailyLogin
        db.create_all() 