from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import tornado_pull

app = Flask(__name__)

conn = "mongodb://localhost:27017/phone_app"

app.config["MONGO_URI"] = conn
mongo = PyMongo(app)

@app.route("/")
def index():
    tornadoes = mongo.db.tornadoes.find_one()    
    return render_template("index.html", tornado_df=tornadoes)

@app.route("/scrape")
def scraper():
    tornadoes = mongo.db.tornadoes
    tornado_df = tornado_pull.pull()
    tornadoes.update_many({}, {"$set": tornado_df},upsert=True)
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)