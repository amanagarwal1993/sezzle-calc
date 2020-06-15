from flask import Flask
from config import Config
from flask_session import Session

flaskapp = Flask(__name__)
flaskapp.config.from_object(Config)
db = {}
from app import routes

if __name__ == '__main__':
    socketio.run(flaskapp)