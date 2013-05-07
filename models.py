from google.appengine.ext import db

class Feedback(db.Model):
    email = db.StringProperty()
    message = db.StringProperty(required=True)