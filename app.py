import os
from flask import Flask
from werkzeug.middleware.proxy_fix import ProxyFix
from extensions import db, init_db
from routes import bp as main_blueprint

def create_app():
    # Create the app
    app = Flask(__name__, 
        static_folder='static',
        static_url_path='/static',
        template_folder='templates'
    )
    app.secret_key = os.environ.get("SESSION_SECRET", "mist-secret-key-for-meet")
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

    # Configure the database
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mist.db"
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "pool_recycle": 300,
        "pool_pre_ping": True,
    }

    # Initialize extensions
    init_db(app)
    
    # Register blueprints
    app.register_blueprint(main_blueprint)
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


