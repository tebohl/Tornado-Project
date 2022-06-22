# Dependencies
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import tornado_pull

app = Flask(__name__)

# set inline
mongo = PyMongo(app, uri="mongodb://localhost:27017/tornado_app")

# create a collection, lazy loading
tornado_collection = mongo.db.tornado_info

@app.route("/")
def index():
    # find one document from our mongo db and return it.
    tornado_results = tornado_collection.find_one()
    # pass that listing to render_template
    return render_template("index.html", tornado_info=tornado_results)

# set our path to /pull
@app.route("/pull")
def pull():
    # call the pull function in our scrape_mars file. This will pull the data and save to mongo.
    tornado_data = tornado_pull.pull()
    # update with the data or create&insert if collection doesn't exist
    tornado_collection.update_one({}, {"$set": tornado_data}, upsert=True)
    # return a message to our page so we know it was successful.
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
