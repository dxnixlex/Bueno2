from flask import Flask, request, jsonify
from flask_cors import CORS
from analisis import ejecutar_procesamiento
import sqlite3

app = Flask(__name__)
CORS(app)                   # Permite que React (en otro puerto) se conecte

# Usuario
usuario = "ariel"
contrasena = "12345678"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    if username == usuario and password == contrasena:
        return jsonify({"success": True, "message": "Login exitoso"})
    else: 
        return jsonify({"success": False, "message": "Credenciales inválidas"}), 401
    
@app.route('/analizar-video', methods=['POST'])
def ejecutar_script():
    resultado = ejecutar_procesamiento()
    return jsonify({"message": resultado})

@app.route('/ultimos-resultados', methods=['GET'])
def obtener_ultimos_resultados():
    conn = sqlite3.connect("vision_artificial.db")
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT fecha, arboles_monitoreados, frutos_maduros, frutos_verdes,
               frutos_monilia, frutos_oidio, frutos_tiro, hoja_taphrina, casos_detectados
        FROM analisis
        ORDER BY id DESC
        LIMIT 1
    ''')
    
    fila = cursor.fetchone()
    conn.close()
    
    if fila:
        claves = ["fecha", "arboles_monitoreados", "frutos_maduros", "frutos_verdes",
                  "frutos_monilia", "frutos_oidio", "frutos_tiro", "hoja_taphrina", "casos_detectados"]
        return jsonify(dict(zip(claves, fila)))
    else:
        return jsonify({"error": "No hay registros"}), 404

if __name__ == '__main__':
    app.run(debug=True)