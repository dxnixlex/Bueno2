import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, CloudRain, Sun, Map, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const [userData, setUserData] = useState({
    usuario: "Ariel Choque C.",
    datos: {
      arbolesMonitoreados: 0,
      duraznosMaduros: 0,
      duraznosVerdes: 0,
      casosDetectados: 0
    },
    meteorologia: {
      temperatura: 0,
      humedad: 0,
      presion: 0,
      viento: 0,
      precipitacion: 0,
      radiacion: 0,
      suelo: 0
    },
    alertas: {
      monilia: 0,
      oidio: 0,
      tiro: 0,
      taphrina: 0
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Actualizar los resultados al iniciar el componente
  useEffect(() => {
    cargarUltimosResultados();
  }, []);

  // Funcion para actualizar los datos de las alertas
  const cargarUltimosResultados = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/ultimos-resultados");
      if (!response.ok) {
        throw new Error("Error al obtener los últimos resultados");
      }
      const data = await response.json();

      // Actualizar el estado con los datos recibidos
      setUserData(prev => ({
        ...prev,
        datos: {
          arbolesMonitoreados: data.arboles_monitoreados || 0,
          duraznosMaduros: data.frutos_maduros || 0,
          duraznosVerdes: data.frutos_verdes || 0,
          casosDetectados: data.casos_detectados || 0
        },
        alertas: {
          monilia: data.frutos_monilia || 0,
          oidio: data.frutos_oidio || 0,
          tiro: data.frutos_tiro || 0,
          taphrina: data.hoja_taphrina || 0
        }
      }));
    } catch (error) {
      console.error("Error al cargar resultados:", error);
    }
  };
  

  // Funcion para analizar el video
  const analizarVideo = async () => {
    setIsLoading(true);
    try {
      // Ejecutar el analisis
      const response = await fetch("http://127.0.0.1:5000/analizar-video", {
        method: 'POST',
        headers: { "Content-type": "application/json" }
      });
      if (!response.ok) {
        throw new Error("Error al procesar el video");
      }

      const data = await response.json();
      alert(data.mensaje || "Análisis completado con éxito");

      // Actualizar los resultados despues del analisis
      await cargarUltimosResultados();
    } catch (error) {
      console.error("Error al procesar:", error);
      alert(error.message || "Ocurrió un error durante el análisis");
    } finally {
      setIsLoading(false);
    }
  };
  
    return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 shadow-md">
        <div className="p-4 font-medium text-gray-800">{userData.usuario}</div>
        
        <div className="px-4 py-2">
                <button 
                onClick={analizarVideo}
                disabled={isLoading}
                className={`w-full ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-blue-50'} text-gray-700 py-3 px-4 rounded shadow`}>
                {isLoading ? 'Procesando...' : 'Analizar Video'}
                </button>
                </div>
        
        <div className="px-4 py-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-100 text-blue-800 py-3 px-4 rounded shadow">
            Dashboard
          </button>
        </div>
        
        <div className="px-4 py-2">
          <button 
            onClick={() => navigate('/imagenes-detectadas')}
            className="w-full bg-gray-200 hover:bg-blue-50 text-gray-700 py-3 px-4 rounded shadow">
            Imágenes Detectadas
          </button>
        </div>
        
        <div className="px-4 py-2">
          <button 
            onClick={() => navigate('/acciones-recomendadas')}
            className="w-full bg-gray-200 hover:bg-blue-50 text-gray-700 py-3 px-4 rounded shadow">
            Acciones Recomendadas
          </button>
        </div>
        
        <div className="px-4 py-2">
          <button 
            onClick={() => navigate('/predicciones')}
            className="w-full bg-gray-200 hover:bg-blue-50 text-gray-700 py-3 px-4 rounded shadow">
            Predicciones de tiempo
          </button>
        </div>
        
        <div className="px-4 py-2">
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-red-100 hover:bg-red-200 text-red-800 py-3 px-4 rounded shadow">
            Cerrar Sesión
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-blue-50">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">ANÁLISIS DE VISIÓN ARTIFICIAL</h1>
        
        {/* Indicadores principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">🌳</span>
              <span className="text-gray-800 font-medium">{userData.datos.arbolesMonitoreados} Árboles Monitoreados</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <span className="text-orange-500 mr-2">🍑</span>
              <span className="text-gray-800 font-medium">{userData.datos.duraznosMaduros} Duraznos Maduros</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">🍏</span>
              <span className="text-gray-800 font-medium">{userData.datos.duraznosVerdes} Duraznos Verdes</span>
            </div>
          </div>
          
          <div className="bg-red-100 p-4 rounded-lg shadow">
            <div className="flex items-center">
              <span className="text-yellow-600 mr-2">⚠️</span>
              <span className="text-gray-800 font-medium">{userData.datos.casosDetectados} Casos Detectados</span>
            </div>
          </div>
        </div>
        
        {/* Sección de meteorología y alertas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Datos Meteorológicos */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Datos Meteorológicos</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Thermometer size={20} className="text-red-500 mr-2" />
                <span className="text-gray-700">Temperatura: {userData.meteorologia.temperatura}°C</span>
              </div>
              <div className="flex items-center">
                <Droplets size={20} className="text-blue-500 mr-2" />
                <span className="text-gray-700">Humedad Relativa: {userData.meteorologia.humedad}%</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 12h.01M12 12h.01M18 12h.01" />
                </svg>
                <span className="text-gray-700">Presión Atmosférica: {userData.meteorologia.presion} hPa</span>
              </div>
              <div className="flex items-center">
                <Wind size={20} className="text-gray-400 mr-2" />
                <span className="text-gray-700">Velocidad del Viento: {userData.meteorologia.viento} km/h</span>
              </div>
              <div className="flex items-center">
                <CloudRain size={20} className="text-blue-400 mr-2" />
                <span className="text-gray-700">Cantidad de Precipitación: {userData.meteorologia.precipitacion} mm</span>
              </div>
              <div className="flex items-center">
                <Sun size={20} className="text-yellow-500 mr-2" />
                <span className="text-gray-700">Radiación Solar: {userData.meteorologia.radiacion} W/m²</span>
              </div>
              <div className="flex items-center">
                <Droplets size={20} className="text-blue-500 mr-2" />
                <span className="text-gray-700">Humedad del Suelo: {userData.meteorologia.suelo}%</span>
              </div>
            </div>
          </div>
          
          {/* Alertas */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <AlertTriangle size={20} className="text-yellow-500 mr-2" />
              Alertas Activas
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Monilia: </span>
                <span className="text-gray-700">{userData.alertas.monilia} Casos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Oidio: </span>
                <span className="text-gray-700">{userData.alertas.oidio} Casos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tiro: </span>
                <span className="text-gray-700">{userData.alertas.tiro} Casos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Taphrina: </span>
                <span className="text-gray-700">{userData.alertas.taphrina} Casos</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mapa */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
            <Map size={20} className="text-blue-500 mr-2" />
            Ubicación de la Detección
          </h2>
          <div className="relative h-64 w-full border border-gray-300 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gray-100">
              <div className="h-full w-full flex items-center justify-center">
                <img 
                  src="/api/placeholder/1200/400" 
                  alt="Mapa de ubicación" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white bg-opacity-70 p-1 rounded">
                © Leaflet | © OpenStreetMap contributors
              </div>
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                <button className="bg-white w-6 h-6 flex items-center justify-center shadow rounded">+</button>
                <button className="bg-white w-6 h-6 flex items-center justify-center shadow rounded">-</button>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}