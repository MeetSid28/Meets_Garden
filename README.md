# Meet's Garden - A Romantic To-Do App 🌹

A beautiful Flask web application designed as a romantic gift for Meet, featuring a gamified floral to-do list with animations, achievements, and sweet messages.

## Features

- **Romantic Authentication**: Special girlfriend verification system
- **Garden Theme**: Light pink and white design with floral elements
- **Gamified Tasks**: Earn Flower Bucks by completing tasks
- **100+ Achievements**: Unlock badges for various accomplishments
- **Sweet Messages**: Romantic messages appear every 30 seconds
- **Love Easter Egg**: Type "love" for heart animations
- **Secret Hug Page**: Hidden route for special messages
- **Day Streak Tracking**: Tracks consecutive daily visits automatically
- **Animated Elements**: Growing flowers, bouncing buttons, falling petals

## How to Run Meet's Garden in VS Code

### Prerequisites
- Python 3.8 or higher
- VS Code (Download from: https://code.visualstudio.com/)
- Python extension for VS Code

### Step-by-Step Setup

#### 1. Download and Extract Project
1. Download all project files from Replit (use the download button)
2. Extract/unzip to a folder on your computer (e.g., `C:\MeetsGarden` or `~/MeetsGarden`)
3. Open VS Code
4. Go to File → Open Folder and select your project folder

#### 2. Install Python Extension (if not already installed)
1. In VS Code, click the Extensions icon (left sidebar)
2. Search for "Python" 
3. Install the Python extension by Microsoft

#### 3. Create Virtual Environment
1. Open VS Code terminal: View → Terminal (or Ctrl+`)
2. Run this command:
```bash
python -m venv venv
```

#### 4. Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**

source venv/bin/activate

You should see `(venv)` at the start of your terminal line.

#### 5. Install Required Packages

pip install -r mist_requirements.txt

#### 6. Run the Application

python app.py


#### 7. Open in Browser
Open your browser and go to: http://localhost:5000

### Day Streak System Explained

The day streak tracks consecutive daily visits:
- **First Visit**: Streak starts at 1
- **Next Day Visit**: Streak increases by 1  
- **Same Day**: Streak stays the same
- **Skip a Day**: Streak resets to 1
- **View Streak**: Click the Flower Bucks dropdown in the garden

The system automatically tracks when Meet visits each day and updates the streak accordingly.

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