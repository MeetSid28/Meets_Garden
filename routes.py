from flask import render_template, request, redirect, url_for, session, jsonify, flash
from app import app, db
from models import Task, Achievement, UserStats, DailyLogin
from datetime import datetime, date
import json

@app.route('/')
def index():
    """Initial authentication page"""
    if session.get('authenticated'):
        return redirect(url_for('garden'))
    return render_template('index.html')

@app.route('/authenticate', methods=['POST'])
def authenticate():
    """Handle the girlfriend authentication"""
    answer = request.form.get('answer')
    if answer == 'yes':
        session['authenticated'] = True
        
        # Update user stats
        stats = UserStats.query.first()
        if not stats:
            stats = UserStats(authenticated=True)
            db.session.add(stats)
        else:
            stats.authenticated = True
        
        # Handle daily login
        today = date.today()
        if not stats.last_login or stats.last_login != today:
            # Check if consecutive day
            if stats.last_login and (today - stats.last_login).days == 1:
                stats.current_streak += 1
            elif not stats.last_login or (today - stats.last_login).days > 1:
                stats.current_streak = 1
            
            stats.last_login = today
            
            # Add daily login record
            login = DailyLogin(login_date=today, flower_grown='rose' if stats.current_streak % 2 == 1 else 'tulip')
            db.session.add(login)
        
        db.session.commit()
        return redirect(url_for('welcome'))
    else:
        flash('This garden is specially made for Meet! 🌹', 'error')
        return redirect(url_for('index'))

@app.route('/welcome')
def welcome():
    """Welcome page with animations"""
    if not session.get('authenticated'):
        return redirect(url_for('index'))
    return render_template('welcome.html')

@app.route('/garden')
def garden():
    """Main garden/todo page"""
    if not session.get('authenticated'):
        return redirect(url_for('index'))
    
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
            Achievement(name="Rose Collector", description="Complete 5 tasks", badge_icon="🌹"),
            Achievement(name="Tulip Champion", description="Complete 3 tasks quickly", badge_icon="🌷"),
            Achievement(name="Garden Master", description="Maintain a 7-day streak", badge_icon="🌺"),
            Achievement(name="Flower Millionaire", description="Earn 100 Flower Bucks", badge_icon="💰"),
            Achievement(name="Daily Gardener", description="Login for 3 consecutive days", badge_icon="🌱")
        ]
        for achievement in achievements:
            db.session.add(achievement)
        db.session.commit()
    
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    stats = UserStats.query.first()
    achievements = Achievement.query.all()
    recent_logins = DailyLogin.query.order_by(DailyLogin.login_date.desc()).limit(7).all()
    
    return render_template('garden.html', tasks=tasks, stats=stats, achievements=achievements, recent_logins=recent_logins)

@app.route('/add_task', methods=['POST'])
def add_task():
    """Add a new task"""
    if not session.get('authenticated'):
        return redirect(url_for('index'))
    
    title = request.form.get('title')
    description = request.form.get('description', '')
    flower_type = request.form.get('flower_type', 'rose')
    
    if title:
        task = Task(title=title, description=description, flower_type=flower_type)
        db.session.add(task)
        db.session.commit()
        flash('New task planted in your garden! 🌱', 'success')
    
    return redirect(url_for('garden'))

@app.route('/complete_task/<int:task_id>')
def complete_task(task_id):
    """Mark a task as completed"""
    if not session.get('authenticated'):
        return redirect(url_for('index'))
    
    task = Task.query.get_or_404(task_id)
    task.completed = True
    task.completed_at = datetime.utcnow()
    
    # Update user stats
    stats = UserStats.query.first()
    if not stats:
        stats = UserStats()
        db.session.add(stats)
    
    stats.total_flower_bucks += task.flower_bucks
    stats.total_tasks_completed += 1
    
    # Check for achievements
    check_achievements(stats)
    
    db.session.commit()
    flash(f'Task completed! Earned {task.flower_bucks} Flower Bucks 🌸', 'success')
    
    return redirect(url_for('garden'))

@app.route('/delete_task/<int:task_id>')
def delete_task(task_id):
    """Delete a task"""
    if not session.get('authenticated'):
        return redirect(url_for('index'))
    
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    flash('Task removed from garden 🍃', 'info')
    
    return redirect(url_for('garden'))

@app.route('/hug')
def hug():
    """Secret hug route"""
    if not session.get('authenticated'):
        return redirect(url_for('index'))
    return render_template('hug.html')

@app.route('/reset_garden')
def reset_garden():
    """Reset the entire garden (for testing)"""
    if not session.get('authenticated'):
        return redirect(url_for('index'))
    
    # Clear session
    session.clear()
    
    # Clear database
    db.drop_all()
    db.create_all()
    
    flash('Garden has been reset! 🌱', 'info')
    return redirect(url_for('index'))

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
