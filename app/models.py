from app import db

class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    expr = db.Column(db.String)
    answer = db.Column(db.Float)
    
    def __repr__(self):
        return ('query ' + self.expr + ' answer ' + str(self.answer))