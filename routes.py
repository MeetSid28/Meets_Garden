from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify, flash, current_app
from extensions import db
from models import Task, Achievement, UserStats, DailyLogin
from datetime import datetime, date
import json

# Create blueprint instead of using app directly
bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    """Initial authentication page"""
    if session.get('authenticated'):
        return redirect(url_for('main.garden'))
    return render_template('index.html')

@bp.route('/authenticate', methods=['POST'])
def authenticate():
    """Handle the girlfriend authentication"""
    answer = request.form.get('answer')
    print(f"Debug - Received answer: {answer}")  # Debug log
    print(f"Debug - Form data: {request.form}")  # Debug log
    if answer == 'yes':
        print("Debug - Answer is yes, setting session")  # Debug log
        session['authenticated'] = True
        # Update user stats and handle DB writes — do this safely so the server
        # doesn't crash if the DB isn't writable (e.g. read-only / serverless env).
        try:
            # Update user stats
            stats = UserStats.query.first()
            if not stats:
                stats = UserStats(authenticated=True)
                db.session.add(stats)
            else:
                stats.authenticated = True

            # Handle daily login
            today = date.today()

            # If last_login contains a datetime object convert to date for safe math
            if stats.last_login and isinstance(stats.last_login, datetime):
                stats_last = stats.last_login.date()
            else:
                stats_last = stats.last_login

            if not stats_last or stats_last != today:
                # Check if consecutive day (safe because stats_last is a date or None)
                if stats_last and (today - stats_last).days == 1:
                    stats.current_streak += 1
                else:
                    # either first login or a break in the streak
                    stats.current_streak = 1

                stats.last_login = today

                # Add daily login record
                login = DailyLogin(login_date=today, flower_grown='rose' if stats.current_streak % 2 == 1 else 'tulip')
                db.session.add(login)

            db.session.commit()
            print("Debug - Redirecting to welcome")  # Debug log
            return redirect(url_for('main.welcome'))
        except Exception as exc:
            # Failure to write to DB must not crash the entire app — rollback and continue
            db.session.rollback()
            current_app.logger.exception('Failed to update UserStats on authenticate')
            # Still keep the user authenticated in session; show a non-fatal message
            flash('You are authenticated — there was a temporary server issue saving your stats. ❤️', 'warning')
            return redirect(url_for('main.welcome'))
    else:
        print(f"Debug - Answer is not yes, showing error")  # Debug log
        flash('This garden is specially made for Meet! 🌹', 'error')
        return redirect(url_for('main.index'))

@bp.route('/welcome')
def welcome():
    """Welcome page with animations"""
    if not session.get('authenticated'):
        return redirect(url_for('main.index'))
    return render_template('welcome.html')

@bp.route('/garden')
def garden():
    """Main garden/todo page"""
    if not session.get('authenticated'):
        return redirect(url_for('main.index'))
    
    # Initialize default tasks if none exist
    if Task.query.count() == 0:
        default_tasks = [
            Task(title="Remember you're amazing 💖", description="Take a moment to appreciate yourself", flower_type="rose"),
            Task(title="Give yourself a hug today", description="Self-love is the best love", flower_type="tulip"),
            Task(title="Smile at something beautiful", description="Find beauty in the little things", flower_type="rose"),
            Task(title="Tell someone you love them", description="Spread the love around", flower_type="tulip"),
            Task(title="Do something that makes you happy", description="Your happiness matters", flower_type="rose")
        ]
        for task in default_tasks:
            db.session.add(task)
        db.session.commit()
    
    # Initialize achievements if none exist
    if Achievement.query.count() == 0:
        achievements = [
            # Basic Achievements
            Achievement(name="Rose Collector", description="Complete 5 tasks", badge_icon="🌹"),
            Achievement(name="Tulip Champion", description="Complete 3 tasks quickly", badge_icon="🌷"),
            Achievement(name="Garden Master", description="Maintain a 7-day streak", badge_icon="🌺"),
            Achievement(name="Flower Millionaire", description="Earn 100 Flower Bucks", badge_icon="💰"),
            Achievement(name="Daily Gardener", description="Login for 3 consecutive days", badge_icon="🌱"),
            
            # Milestone Achievements
            Achievement(name="First Bloom", description="Complete your first task", badge_icon="🌸"),
            Achievement(name="Ten Petals", description="Complete 10 tasks", badge_icon="🌻"),
            Achievement(name="Twenty Blooms", description="Complete 20 tasks", badge_icon="🌼"),
            Achievement(name="Fifty Flowers", description="Complete 50 tasks", badge_icon="🌺"),
            Achievement(name="Century Garden", description="Complete 100 tasks", badge_icon="🏆"),
            Achievement(name="Two Hundred Tasks", description="Complete 200 tasks", badge_icon="💎"),
            Achievement(name="Three Hundred Blooms", description="Complete 300 tasks", badge_icon="👑"),
            Achievement(name="Five Hundred Master", description="Complete 500 tasks", badge_icon="🎖️"),
            Achievement(name="Legendary Gardener", description="Complete 1000 tasks", badge_icon="⭐"),
            
            # Streak Achievements
            Achievement(name="Weekend Warrior", description="Maintain 2-day streak", badge_icon="💪"),
            Achievement(name="Week Wonder", description="Maintain 7-day streak", badge_icon="📅"),
            Achievement(name="Fortnight Fighter", description="Maintain 14-day streak", badge_icon="🔥"),
            Achievement(name="Monthly Marvel", description="Maintain 30-day streak", badge_icon="📆"),
            Achievement(name="Streak Superstar", description="Maintain 60-day streak", badge_icon="🌟"),
            Achievement(name="Consistency Queen", description="Maintain 100-day streak", badge_icon="👸"),
            Achievement(name="Year Long Bloomer", description="Maintain 365-day streak", badge_icon="🎊"),
            
            # Flower Buck Achievements
            Achievement(name="Penny Saver", description="Earn 10 Flower Bucks", badge_icon="🪙"),
            Achievement(name="Coin Collector", description="Earn 50 Flower Bucks", badge_icon="💰"),
            Achievement(name="Buck Hunter", description="Earn 200 Flower Bucks", badge_icon="💸"),
            Achievement(name="Rich Gardener", description="Earn 500 Flower Bucks", badge_icon="💎"),
            Achievement(name="Flower Tycoon", description="Earn 1000 Flower Bucks", badge_icon="🏦"),
            Achievement(name="Garden Billionaire", description="Earn 2000 Flower Bucks", badge_icon="💰"),
            Achievement(name="Wealth Master", description="Earn 5000 Flower Bucks", badge_icon="🤑"),
            
            # Special Theme Achievements
            Achievement(name="Rose Lover", description="Complete 10 rose tasks", badge_icon="🌹"),
            Achievement(name="Tulip Expert", description="Complete 10 tulip tasks", badge_icon="🌷"),
            Achievement(name="Morning Glory", description="Complete task before 9 AM", badge_icon="🌅"),
            Achievement(name="Night Owl", description="Complete task after 10 PM", badge_icon="🦉"),
            Achievement(name="Weekend Gardener", description="Complete task on weekend", badge_icon="🎉"),
            Achievement(name="Productive Monday", description="Complete task on Monday", badge_icon="📝"),
            Achievement(name="Hump Day Hero", description="Complete task on Wednesday", badge_icon="🐪"),
            Achievement(name="Friday Finisher", description="Complete task on Friday", badge_icon="🎊"),
            
            # Love & Romance Achievements
            Achievement(name="Love Finder", description="Discover the love easter egg", badge_icon="💕"),
            Achievement(name="Heart Hunter", description="Type 'love' 5 times", badge_icon="💖"),
            Achievement(name="Romance Expert", description="Visit hug page 3 times", badge_icon="💝"),
            Achievement(name="Secret Keeper", description="Find all easter eggs", badge_icon="🤫"),
            Achievement(name="Cuddle Master", description="Send 10 virtual hugs", badge_icon="🤗"),
            Achievement(name="Sweet Talker", description="Read 20 sweet messages", badge_icon="💌"),
            Achievement(name="Love Story", description="Use app for 7 days", badge_icon="📖"),
            
            # Seasonal Achievements
            Achievement(name="Spring Awakening", description="Complete task in March", badge_icon="🌷"),
            Achievement(name="Summer Bloomer", description="Complete task in June", badge_icon="🌻"),
            Achievement(name="Autumn Harvester", description="Complete task in September", badge_icon="🍂"),
            Achievement(name="Winter Wonderland", description="Complete task in December", badge_icon="❄️"),
            Achievement(name="New Year Starter", description="Complete task in January", badge_icon="🎊"),
            Achievement(name="Valentine Lover", description="Complete task on Feb 14", badge_icon="💘"),
            Achievement(name="Birthday Bloomer", description="Complete task on birthday", badge_icon="🎂"),
            
            # Time-based Achievements
            Achievement(name="Speed Demon", description="Complete task in under 1 minute", badge_icon="⚡"),
            Achievement(name="Quick Bloomer", description="Complete 5 tasks in one day", badge_icon="🏃‍♀️"),
            Achievement(name="Power Hour", description="Complete 3 tasks in one hour", badge_icon="⏰"),
            Achievement(name="Marathon Runner", description="Complete 20 tasks in one day", badge_icon="🏃"),
            Achievement(name="Garden Sprint", description="Complete 10 tasks in 2 hours", badge_icon="💨"),
            
            # Creativity Achievements
            Achievement(name="Creative Soul", description="Add 50 custom tasks", badge_icon="🎨"),
            Achievement(name="Task Master", description="Create task with long description", badge_icon="📝"),
            Achievement(name="Organized Mind", description="Complete tasks in order", badge_icon="🗂️"),
            Achievement(name="Detail Oriented", description="Add descriptions to 20 tasks", badge_icon="🔍"),
            Achievement(name="Planner Pro", description="Create 10 tasks in advance", badge_icon="📋"),
            
            # Fun Achievements
            Achievement(name="Emoji Lover", description="Use 100 flower emojis", badge_icon="😍"),
            Achievement(name="Garden Party", description="Complete all default tasks", badge_icon="🎉"),
            Achievement(name="Perfectionist", description="Complete 50 tasks flawlessly", badge_icon="✨"),
            Achievement(name="Motivational Guru", description="Read all encouraging messages", badge_icon="💪"),
            Achievement(name="Happiness Seeker", description="Find joy in small tasks", badge_icon="😊"),
            
            # Advanced Achievements
            Achievement(name="Elite Gardener", description="Reach top 1% performance", badge_icon="🏅"),
            Achievement(name="Unstoppable Force", description="Never miss a day for 30 days", badge_icon="🚀"),
            Achievement(name="Garden Architect", description="Design perfect task layout", badge_icon="🏗️"),
            Achievement(name="Bloom Master", description="Master all flower types", badge_icon="🎓"),
            Achievement(name="Zen Gardener", description="Find peace in daily tasks", badge_icon="🧘‍♀️"),
            
            # Relationship Achievements
            Achievement(name="Better Half", description="Complete tasks to help relationship", badge_icon="💑"),
            Achievement(name="Support System", description="Be encouraging for 14 days", badge_icon="🤝"),
            Achievement(name="Love Language", description="Express love through tasks", badge_icon="💬"),
            Achievement(name="Partnership Pro", description="Balance work and love", badge_icon="⚖️"),
            Achievement(name="Soulmate Status", description="Perfect compatibility score", badge_icon="👫"),
            
            # Personal Growth Achievements
            Achievement(name="Self Improver", description="Focus on personal development", badge_icon="📈"),
            Achievement(name="Habit Builder", description="Build 5 positive habits", badge_icon="🔧"),
            Achievement(name="Goal Setter", description="Set and achieve 10 goals", badge_icon="🎯"),
            Achievement(name="Dream Chaser", description="Pursue ambitious tasks", badge_icon="🌙"),
            Achievement(name="Life Organizer", description="Organize life priorities", badge_icon="📊"),
            
            # Social Achievements
            Achievement(name="Inspiration Source", description="Inspire others through tasks", badge_icon="💡"),
            Achievement(name="Community Builder", description="Connect with others", badge_icon="🏘️"),
            Achievement(name="Kindness Spreader", description="Do acts of kindness", badge_icon="❤️"),
            Achievement(name="Positive Vibes", description="Maintain positive attitude", badge_icon="☀️"),
            Achievement(name="Good Influence", description="Set positive example", badge_icon="🌟"),
            
            # Health & Wellness Achievements
            Achievement(name="Wellness Warrior", description="Focus on health tasks", badge_icon="🏥"),
            Achievement(name="Mind & Body", description="Balance mental and physical", badge_icon="🧠"),
            Achievement(name="Self Care Pro", description="Prioritize self-care", badge_icon="🛁"),
            Achievement(name="Energy Booster", description="Maintain high energy", badge_icon="⚡"),
            Achievement(name="Balance Master", description="Achieve work-life balance", badge_icon="⚖️"),
            
            # Achievement Hunter Achievements
            Achievement(name="Trophy Hunter", description="Unlock 10 achievements", badge_icon="🏆"),
            Achievement(name="Badge Collector", description="Unlock 25 achievements", badge_icon="🎖️"),
            Achievement(name="Achievement Addict", description="Unlock 50 achievements", badge_icon="🏅"),
            Achievement(name="Completion King", description="Unlock 75 achievements", badge_icon="👑"),
            Achievement(name="Ultimate Champion", description="Unlock all achievements", badge_icon="🌟"),
            
            # Secret Achievements
            Achievement(name="Explorer", description="Find hidden features", badge_icon="🗺️"),
            Achievement(name="Secret Agent", description="Discover secret routes", badge_icon="🕵️"),
            Achievement(name="Mystery Solver", description="Solve hidden puzzles", badge_icon="🔍"),
            Achievement(name="Hidden Gem", description="Find rare easter eggs", badge_icon="💎"),
            Achievement(name="Code Breaker", description="Unlock secret content", badge_icon="🔐")
        ]
        for achievement in achievements:
            db.session.add(achievement)
        db.session.commit()
    
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    stats = UserStats.query.first()
    achievements = Achievement.query.all()
    recent_logins = DailyLogin.query.order_by(DailyLogin.login_date.desc()).limit(7).all()
    
    return render_template('garden.html', tasks=tasks, stats=stats, achievements=achievements, recent_logins=recent_logins)

@bp.route('/add_task', methods=['POST'])
def add_task():
    """Add a new task"""
    if not session.get('authenticated'):
        return redirect(url_for('main.index'))
    
    title = request.form.get('title')
    description = request.form.get('description', '')
    flower_type = request.form.get('flower_type', 'rose')
    
    if title:
        task = Task(title=title, description=description, flower_type=flower_type)
        db.session.add(task)
        db.session.commit()
        flash('New task planted in your garden! 🌱', 'success')
    
    return redirect(url_for('main.garden'))

@bp.route('/complete_task/<int:task_id>')
def complete_task(task_id):
    """Mark a task as completed"""
    if not session.get('authenticated'):
        return redirect(url_for('main.index'))
    
    task = Task.query.get_or_404(task_id)
    task.completed = True
    task.completed_at = datetime.utcnow()
    
    # Update user stats
    stats = UserStats.query.first()
    if not stats:
        stats = UserStats(total_flower_bucks=0, total_tasks_completed=0, current_streak=0)
        db.session.add(stats)
    
    # Initialize values if they are None
    if stats.total_flower_bucks is None:
        stats.total_flower_bucks = 0
    if stats.total_tasks_completed is None:
        stats.total_tasks_completed = 0
    
    stats.total_flower_bucks += task.flower_bucks
    stats.total_tasks_completed += 1
    
    # Check for achievements
    check_achievements(stats)
    
    db.session.commit()
    flash(f'Task completed! Earned {task.flower_bucks} Flower Bucks 🌸', 'success')
    
    return redirect(url_for('main.garden'))

@bp.route('/delete_task/<int:task_id>')
def delete_task(task_id):
    """Delete a task"""
    if not session.get('authenticated'):
        return redirect(url_for('main.index'))
    
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    flash('Task removed from garden 🍃', 'info')
    
    return redirect(url_for('main.garden'))

@bp.route('/hug')
def hug():
    """Secret hug route"""
    if not session.get('authenticated'):
        return redirect(url_for('main.index'))
    return render_template('hug.html')

@bp.route('/reset_garden')
def reset_garden():
    """Reset the entire garden (for testing)"""
    if not session.get('authenticated'):
        return redirect(url_for('main.index'))
    
    # Clear session
    session.clear()
    
    # Clear database
    db.drop_all()
    db.create_all()
    
    flash('Garden has been reset! 🌱', 'info')
    return redirect(url_for('main.index'))

def check_achievements(stats):
    """Check and unlock achievements"""
    achievements = Achievement.query.filter_by(unlocked=False).all()
    
    for achievement in achievements:
        should_unlock = False
        
        if achievement.name == "Rose Collector" and stats.total_tasks_completed >= 5:
            should_unlock = True
        elif achievement.name == "Tulip Champion" and stats.total_tasks_completed >= 3:
            should_unlock = True
        elif achievement.name == "Garden Master" and stats.current_streak >= 7:
            should_unlock = True
        elif achievement.name == "Flower Millionaire" and stats.total_flower_bucks >= 100:
            should_unlock = True
        elif achievement.name == "Daily Gardener" and stats.current_streak >= 3:
            should_unlock = True
        
        if should_unlock:
            achievement.unlocked = True
            achievement.unlocked_at = datetime.utcnow()
            # Award bonus flower bucks for achievements
            stats.total_flower_bucks += 20
