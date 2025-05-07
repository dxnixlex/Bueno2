import sqlite3

DB_FILE = "vision_artificial.db"             # nombre de la base de datos

def crear_conexion():
    """Crea una conexion a la base de datos SQLite"""
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        return conn
    except sqlite3.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
    return conn

def crear_tabla_analisis():
    """Crea la tabla 'analisis' para los resultados de vision artificial"""
    conn = crear_conexion()
    if conn is not None:
        try:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS analisis (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    fecha TEXT,
                    arboles_monitoreados INTEGER,
                    frutos_maduros INTEGER,
                    frutos_verdes INTEGER,
                    frutos_monilia INTEGER,
                    frutos_oidio INTEGER,
                    frutos_tiro INTEGER,
                    hoja_taphrina INTEGER,
                    casos_detectados INTEGER
                )
            ''')
            conn.commit()
            print("Tabla 'analisis' creada exitosamente")
        except sqlite3.Error as e:
            print(f"Error al crear la tabla 'analisis': {e}")
        finally:
            conn.close()
            
def crear_tabla_sensores():
    """Crea la tabla 'sensores' para los datos de sensores ambientales"""
    conn = crear_conexion()
    if conn is not None:
        try:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS sensores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    temperatura REAL,
                    humedad REAL,
                    presion REAL,
                    humedad_suelo REAL,
                    lluvia REAL,
                    radiacion_solar REAL,
                    viento REAL,
                    timestamp TEXT
                )
            ''')
            conn.commit()
            print("Tabla 'sensores' creada exitosamente")
        except sqlite3.Error as e:
            print(f"Error al crear la tabla 'sensores': {e}")
        finally:
            conn.close()
            
def inicializar_db_completa():
    """Inicializa todas las tablas de la base de datos"""
    crear_tabla_analisis()
    crear_tabla_sensores()
    print("Base de datos inicializada completamente")
    
if __name__ == '__main__':
    inicializar_db_completa()