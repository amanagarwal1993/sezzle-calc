from app import db

class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    expr = db.Column(db.String)
    result = db.Column(db.Float)
    
    def __repr__(self):
        return ('query: ' + self.expr + ' result: ' + str(self.result))