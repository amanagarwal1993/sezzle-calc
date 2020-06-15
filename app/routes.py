from app import flaskapp, db
from flask import render_template
from flask_socketio import SocketIO, emit
from flask_session import Session
from operator import pow, truediv, mul, add, sub
from simpleeval import simple_eval
from app.models import Result

session = Session(flaskapp)
socketio = SocketIO(flaskapp, manage_session=False)

@flaskapp.route('/')
def index():
    return render_template('index.html')

@socketio.on('calculate', namespace='/test')
def calculate_expression(query):
    try:
        answer = simple_eval(query)
        
        result = Result(expr=query, result=answer)
        db.session.add(result)
        db.session.commit()
        
        emit('result', {'query': query, 'answer': answer}, broadcast=False)
        emit('calculation', {'query': query, 'answer': answer}, broadcast=True)
    except:
        emit('invalid query', {'response': 'Invalid query. Please check and try again.'}, broadcast=False)
        
    
@socketio.on('connect', namespace='/test')
def test_connect():
    emit('connection', {'data': 'Connected'})
    prev_results = Result.query.all()
    print ('Client connected')
    print (prev_results)

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    emit('disconnection', {'data': 'Disonnected'})
    print('Client disconnected')
