from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Autorise les requêtes depuis le frontend

@app.route("/")
def home():
    return "Backend Flask OK 🚀"

# ===== Connexion MySQL =====
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='kya',        # ou IP serveur MySQL si distant
            user='root',             # ton utilisateur MySQL
            password='JULFe3+170297',             # ton mot de passe MySQL
            database='portfolio'     # nom de la DB
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Erreur connexion MySQL: {err}")
        return None

# ===== API Contact =====
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()

    fullname = data.get('fullname', '').strip()
    phone = data.get('phone', '').strip()
    message = data.get('message', '').strip()

    if not fullname or not phone or not message:
        return jsonify({'status': 'error', 'message': 'Veuillez remplir tous les champs'}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({'status': 'error', 'message': 'Impossible de se connecter à la base'}), 500

    try:
        cursor = conn.cursor()
        sql = "INSERT INTO contacts (fullname, phone, message) VALUES (%s, %s, %s)"
        cursor.execute(sql, (fullname, phone, message))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success', 'message': 'Message envoyé avec succès'})
    except mysql.connector.Error as err:
        print(f"MySQL Error: {err}")
        return jsonify({'status': 'error', 'message': 'Erreur lors de l\'enregistrement'}), 500

if __name__ == '__main__':
    app.run(debug=True)
