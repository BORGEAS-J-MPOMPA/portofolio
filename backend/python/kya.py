from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
  host="HOST",
  user="USER",
  password="PASSWORD",
  database="portfolio"
)

@app.route("/contact", methods=["POST"])
def contact():
    data = request.json
    cursor = db.cursor()
    cursor.execute(
      "INSERT INTO messages (name, phone, message) VALUES (%s,%s,%s)",
      (data["name"], data["phone"], data["message"])
    )
    db.commit()
    return jsonify({"message":"Message envoyé avec succès. Nous vous contacterons rapidement."})

if __name__ == "__main__":
    app.run()
