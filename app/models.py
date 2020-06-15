from app import db

class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String)
    result = db.Column(db.Float)
    
    def __repr__(self):
        return ({'query': self.query, 'result': self.result})