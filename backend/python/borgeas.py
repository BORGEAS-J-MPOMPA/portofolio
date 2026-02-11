from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS  # pour permettre à ton frontend de se connecter

app = Flask(__name__)
CORS(app)  # active les requêtes cross-origin

# ===== Connexion MySQL =====
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',           # ton utilisateur MySQL
            password='',           # ton mot de passe MySQL
            database='portfolio'
        )
        return connection
    except Error as e:
        print("Erreur de connexion MySQL :", e)
        return None

# ===== API pour enregistrer les messages =====
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    fullname = data.get('fullname', '').strip()
    phone = data.get('phone', '').strip()
    message = data.get('message', '').strip()

    if not fullname or not phone or not message:
        return jsonify({"status": "error", "message": "Tous les champs sont requis"}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({"status": "error", "message": "Impossible de se connecter à la base"}), 500

    cursor = conn.cursor()
    query = "INSERT INTO contacts (fullname, phone, message) VALUES (%s, %s, %s)"
    cursor.execute(query, (fullname, phone, message))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"status": "success", "message": "Votre message a été envoyé avec succès. Nous vous contacterons dès que possible."})

# ===== Test simple =====
@app.route('/')
def home():
    return "Backend Flask + MySQL OK 🚀"

if __name__ == '__main__':
    app.run(debug=True)
