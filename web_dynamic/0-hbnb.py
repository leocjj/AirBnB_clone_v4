#!/usr/bin/python3
"""
    Basic WebApplication
"""

from flask import Flask
from flask import render_template
from models import storage
from models.state import State
from models.amenity import Amenity
from models.place import Place
from models.user import User
import uuid

app = Flask(__name__)

@app.teardown_appcontext
def teardown_db(exception):
    """ remove the current SQLAlchemy Session """
    storage.close()



@app.route('/0-hbnb/', strict_slashes=False)
def hbnb():
    """
    hbnn clone whith data from DB mysql
    includes places and users data
    """
    amenities = storage.all(Amenity).values()
    states = storage.all(State).values()
    places = storage.all(Place).values()
    users = storage.all(User).values()
    return render_template('0-hbnb.html', amenities=amenities, states=states,
                           places=places, users=users, cache_id=uuid.uuid4())


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
