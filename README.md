# Mist - A Romantic Garden To-Do App 🌹

A beautiful Flask web application designed as a romantic gift for Meet, featuring a gamified floral to-do list with animations, achievements, and sweet messages.

## Features

- **Romantic Authentication**: Special girlfriend verification system
- **Garden Theme**: Light pink and white design with floral elements
- **Gamified Tasks**: Earn Flower Bucks by completing tasks
- **100+ Achievements**: Unlock badges for various accomplishments
- **Sweet Messages**: Romantic messages appear every 30 seconds
- **Love Easter Egg**: Type "love" for heart animations
- **Secret Hug Page**: Hidden route for special messages
- **Background Chimes**: Gentle musical chimes while using the app
- **Animated Elements**: Growing flowers, bouncing buttons, falling petals

## Setup Instructions for VS Code

### Prerequisites
- Python 3.8 or higher
- VS Code with Python extension

### Step 1: Download and Extract
1. Download the project files from Replit
2. Extract to a folder on your computer
3. Open the folder in VS Code

### Step 2: Create Virtual Environment
Open VS Code terminal and run:
```bash
python -m venv venv
```

### Step 3: Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### Step 4: Install Dependencies
```bash
pip install -r mist_requirements.txt
```

### Step 5: Run the Application
```bash
python app.py
```

The app will be available at: http://localhost:5000

## How to Use

1. **Authentication**: Click "Yes, that's me!" when asked if you're Siddharth's girlfriend
2. **Welcome Animation**: Enjoy the falling hearts and petals
3. **Garden Interface**: Add tasks using the "Plant" button
4. **Complete Tasks**: Click "Bloom" to complete tasks and earn Flower Bucks
5. **Love Easter Egg**: Type "love" in the input box for heart animations
6. **Secret Hug**: Access via the dropdown menu in the top right
7. **Sweet Messages**: Romantic messages will appear every 30 seconds
8. **Background Chimes**: Gentle musical chimes play periodically

## File Structure

```
mist/
├── app.py              # Main Flask application
├── main.py             # Entry point
├── models.py           # Database models
├── routes.py           # Application routes
├── mist_requirements.txt # Dependencies
├── templates/          # HTML templates
│   ├── base.html
│   ├── index.html      # Authentication page
│   ├── welcome.html    # Welcome animation
│   ├── garden.html     # Main garden interface
│   └── hug.html        # Secret hug page
└── static/            # CSS, JS, and assets
    ├── css/
    │   └── style.css   # Main stylesheet
    └── js/
        ├── main.js     # Core functionality
        ├── animations.js # Animation system
        ├── audio.js    # Sound effects
        └── sweet-messages.js # Message system
```

## Troubleshooting

**If the app doesn't start:**
- Make sure virtual environment is activated
- Check Python version: `python --version`
- Reinstall dependencies: `pip install -r mist_requirements.txt`

**If sounds don't work:**
- Click anywhere on the page to enable audio
- Check browser audio permissions

**If database issues occur:**
- Delete `mist.db` file and restart the app
- The database will be recreated automatically

## Special Features

- **100+ Achievements** including milestones, streaks, and seasonal achievements
- **Romantic Messages** with personalized content
- **Gentle Animations** that aren't overwhelming
- **Background Music** with soft chimes
- **SQLite Database** for easy portability
- **Responsive Design** works on mobile and desktop

Made with 💖 for Meet by Siddharth