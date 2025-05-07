import cv2
import glob
import os
import sqlite3
from datetime import datetime
from ultralytics import YOLO

# Etiquetas del modelo
LABELS = ['fruto_maduro', 'fruto_monilia', 'fruto_oidiosis', 'fruto_tiro', 'fruto_verde', 'hoja_taphrina']
ENFERMEDADES = {'fruto_monilia', 'fruto_oidiosis', 'fruto_tiro', 'hoja_taphrina'}

# Carpetas
input_folder = "C:/Users/WIN11/Desktop/Dashboard/complemento/backend/entrada"
output_folder = "C:/Users/WIN11/Desktop/Dashboard/complemento/backend/salida"
os.makedirs(output_folder, exist_ok=True)

# Guardar resultado en base de datos
def guardar_en_db(data):
    conn = sqlite3.connect('vision_artificial.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO analisis (
            fecha, arboles_monitoreados, frutos_maduros, frutos_verdes,
            frutos_monilia, frutos_oidio, frutos_tiro, hoja_taphrina, casos_detectados
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['fecha'],
        data['arboles_monitoreados'],
        data['frutos_maduros'],
        data['frutos_verdes'],
        data['frutos_monilia'],
        data['frutos_oidio'],
        data['frutos_tiro'],
        data['hoja_taphrina'],
        data['casos_detectados']
    ))
    conn.commit()
    conn.close()

# Procesar detecciones para almacenar en BD
def procesar_detecciones(count_per_class, promedio_frutos_por_arbol=100):
    # Detectar si los valores son listas o enteros
    sample_value = next(iter(count_per_class.values()), 0)
    if isinstance(sample_value, list):
        conteo = {k: len(v) for k, v in count_per_class.items()}
    else: 
        conteo = count_per_class  # ya son enteros
        
    frutos_maduros = conteo.get('fruto_maduro', 0)
    frutos_verdes = conteo.get('fruto_verde', 0)
    frutos_monilia = conteo.get('fruto_monilia', 0)
    frutos_oidio = conteo.get('fruto_oidiosis', 0)
    frutos_tiro = conteo.get('fruto_tiro', 0)
    hoja_taphrina = conteo.get('hoja_taphrina', 0)

    casos_detectados = frutos_monilia + frutos_oidio + frutos_tiro + hoja_taphrina
    arboles_monitoreados = max(1, frutos_maduros // promedio_frutos_por_arbol)

    return {
        'fecha': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'arboles_monitoreados': arboles_monitoreados,
        'frutos_maduros': frutos_maduros,
        'frutos_verdes': frutos_verdes,
        'frutos_monilia': frutos_monilia,
        'frutos_oidio': frutos_oidio,
        'frutos_tiro': frutos_tiro,
        'hoja_taphrina': hoja_taphrina,
        'casos_detectados': casos_detectados
    }

# Procesar imágenes
def procesar_imagen(archivo, model):
    image = cv2.imread(archivo)
    results = model.predict(source=image, conf=0.5)
    
    # Contador de detecciones por etiqueta
    detections_count = {label: 0 for label in LABELS}
    etiquetas_detectadas = set()
    
    for result in results:
        for box in result.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            
            # Obtener nombre de la etiquet detectada
            label = LABELS[class_id]
            detections_count[label] += 1
            etiquetas_detectadas.add(label)
            
            # Dubujar caja y etiqueta
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cv2.rectangle(image, (x1, y1), (x2, y2), (255, 0, 0), 2)
            cv2.putText(image, f"{label} ({confidence:.2f})", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    # Mostrar conteos por etiqueta
    y_offset = 30
    for label, count in detections_count.items():
        if count > 0:
            cv2.putText(image, f"{label}: {count}", (10, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            y_offset += 30

    # Guardar imagen procesada
    nombre_archivo = os.path.basename(archivo)
    for etiqueta in etiquetas_detectadas:
        carpeta_etiqueta = os.path.join(output_folder, etiqueta)
        os.makedirs(carpeta_etiqueta, exist_ok=True)
        output_path = os.path.join(carpeta_etiqueta, nombre_archivo)
        cv2.imwrite(output_path, image)

    # Almacenar en base de datos
    data = procesar_detecciones(detections_count)
    guardar_en_db(data)


# Procesar videos
def procesar_video(archivo, model):
    count_per_class = {name: [] for name in LABELS}
    cap = cv2.VideoCapture(archivo)
    
    # Obtener detalles del video original
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = 1020
    height = 500
    # Nombre de salida
    nombre_archivo = os.path.basename(archivo)
    nombre_salida = os.path.join(output_folder, f"procesado_{nombre_archivo}")
    # Inicializar el VideoWriter
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(nombre_salida, fourcc, fps, (width, height))

    # Control de capturas
    ultima_captura = {label: -1000 for label in LABELS}
    intervalo_captura = fps * 2  # mínimo 2 segundos entre capturas por clase
    frame_actual = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.resize(frame, (width, height))
        tracker_line_position = frame.shape[1] // 2

        results = model.track(frame, persist=True)

        etiquetas_en_frame = set()

        if results[0].boxes is not None and results[0].boxes.id is not None:
            boxes = results[0].boxes.xyxy.int().cpu().tolist()
            class_ids = results[0].boxes.cls.int().cpu().tolist()
            track_ids = results[0].boxes.id.int().cpu().tolist()

            for box, class_id, track_id in zip(boxes, class_ids, track_ids):
                class_name = LABELS[class_id]
                x1, y1, x2, y2 = box
                cx = int(x1)
                
                etiquetas_en_frame.add(class_name)

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                label = f"{class_name}"
                cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX,
                            0.5, (0, 255, 0), 2)

                if abs(cx - tracker_line_position) <= 5:
                    if track_id not in count_per_class[class_name]:
                        count_per_class[class_name].append(track_id)

        # Dibujar linea de conteo
        cv2.line(frame, (tracker_line_position, 0), (tracker_line_position, frame.shape[0]), (255, 255, 0), 2) 
        
        # Mostrar conteos
        y_offset = 20
        for class_name in LABELS:
            count = len(count_per_class[class_name])
            cv2.putText(frame, f"{class_name}: {count}", (10, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            y_offset += 30

        # Guardar captura de imagenes
        tomar_captura = False
        for etiqueta in etiquetas_en_frame:
            prioridad = etiqueta in ENFERMEDADES
            tiempo_suficiente = frame_actual - ultima_captura[etiqueta] >= intervalo_captura

            if prioridad or tiempo_suficiente:
                tomar_captura = True
                ultima_captura[etiqueta] = frame_actual

        if tomar_captura:
            nombre_base = os.path.splitext(nombre_archivo)[0]
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            nombre_img = f"{nombre_base}_{timestamp}_{frame_actual}.jpg"

            for etiqueta in etiquetas_en_frame:
                carpeta = os.path.join(output_folder, etiqueta)
                os.makedirs(carpeta, exist_ok=True)
                ruta_captura = os.path.join(carpeta, nombre_img)
                cv2.imwrite(ruta_captura, frame)

        # Dibujar linea de conteo
        # cv2.line(frame, (tracker_line_position, 0), (tracker_line_position, frame.shape[0]), (255, 255, 0), 2)
        
        # Mostrar frame
        out.write(frame)      # Guardar frame procesado
        # cv2.imshow("Deteccion de Duraznos", frame)
        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     break

        frame_actual += 1

    # Guardar en base de datos
    data = procesar_detecciones(count_per_class)
    guardar_en_db(data)
    
    # Liberar recursos
    cap.release()
    out.release()
    cv2.destroyAllWindows()

def ejecutar_procesamiento():
    archivos = glob.glob(f"{input_folder}/*")
    if not archivos:
        print("No se encontraron archivos para procesar.")
        return "No hay archivos en la carpeta de entrada."
    
    for archivo in archivos:
        ext = archivo.split(".")[-1].lower()
        if ext in ["jpg", "jpeg", "png"]:
            model = YOLO("C:/Users/WIN11/Desktop/Dashboard/complemento/backend/yolo11x.pt")
            procesar_imagen(archivo, model)
        elif ext in ["mp4", "avi", "mov"]:
            model = YOLO("C:/Users/WIN11/Desktop/Dashboard/complemento/backend/yolo11x.pt")
            procesar_video(archivo, model)
    
    return "Procesamiento completado exitosamente"
            

# flujo principal
# archivos = glob.glob(f"{input_folder}/*")

# for archivo in archivos:
#     ext = archivo.split(".")[-1].lower()
#     if ext in ["jpg", "jpeg", "png"]:
#         model = YOLO("C:/Users/WIN11/Desktop/Dashboard/complemento/backend/yolo11x.pt")
#         procesar_imagen(archivo)
#     elif ext in ["mp4", "avi", "mov"]:
#         model = YOLO("C:/Users/WIN11/Desktop/Dashboard/complemento/backend/yolo11x.pt")
#         procesar_video(archivo)