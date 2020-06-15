from flask import Flask
from config import Config
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

flaskapp = Flask(__name__)
flaskapp.config.from_object(Config)

db = SQLAlchemy(flaskapp)
migrate = Migrate(flaskapp, db)

from app import routes, models

if __name__ == '__main__':
    socketio.run(flaskapp)