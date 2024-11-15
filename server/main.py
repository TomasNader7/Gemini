"""
This script runs the application using a development server.
It contains the definition of routes and views for the application.
"""

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origin='*')
# Make the WSGI interface available at the top level so wfastcgi can get it.
wsgi_app = app.wsgi_app


@app.route("/api/users", methods=['GET'])
def users():
    return jsonify(
        {
           "users": [
               'Tomas',
               'Kylee',
               'Javier'
               ] 
            }
        )

if __name__ == '__main__':
    app.run(debug=True, port=8080)
