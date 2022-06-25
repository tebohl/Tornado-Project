# Dependencies
from flask import Flask, render_template, redirect, jsonify
import json
from flask_pymongo import PyMongo
import tornado_pull


app = Flask(__name__)

# set inline
mongo = PyMongo(app, uri="mongodb://localhost:27017/tornado_app")

# create a collection, lazy loading
tornado_collection = mongo.db.tornado_info

@app.route("/")
def index():
    # call the pull function in our tornado_pull file. This will pull the data and save to mongo.
    tornado_data = tornado_pull.pull()
    # update with the data or create&insert if collection doesn't exist
    tornado_collection.update_one({}, {"$set": tornado_data}, upsert=True)
    # find one document from our mongo db and return it.
    tornado_results = tornado_collection.find_one()
    # pass that listing to render_template
    return render_template("index.html", tornado_info=tornado_results)

# # set our path to /pull
# @app.route("/pull")
# def pull():
#     # call the pull function in our tornado_pull file. This will pull the data and save to mongo.
#     tornado_data = tornado_pull.pull()
#     # update with the data or create&insert if collection doesn't exist
#     tornado_collection.update_one({}, {"$set": tornado_data}, upsert=True)
#     # return a message to our page so we know it was successful.
#     return redirect("/", code=302)

@app.route("/tracking")
def tracking():
    # find one document from our mongo db and return it.
    tornado_results = tornado_collection.find_one()
    # pass that listing to render_template
    return render_template("tracking.html", tornado_info=tornado_results)

@app.route("/intensity")
def intensity():
    # find one document from our mongo db and return it.
    tornado_results = tornado_collection.find_one()
    # pass that listing to render_template
    return render_template("intensity-plot.html", tornado_info=tornado_results)

@app.route("/api/intensity")
def intensity_api():
    # find one document from our mongo db and return it.
    tornado_results = tornado_collection.find_one({},{'_id':0})
    return json.dumps([tornado_results])


# #route sending data from geojson
# @app.route("/api/v1.0/tornadogeo")
# def tornadogeo():
#     with open("./static/data/tornadoes.geojson") as file:
#             json_decoded = json.load(file)

#     return json_decoded


if __name__ == "__main__":
    app.run(debug=True)