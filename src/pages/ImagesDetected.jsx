import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Thermometer, Droplets, Wind, CloudRain, Sun, Map, AlertTriangle, Camera, RefreshCw } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [userData] = useState({
        usuario: "Ariel Choque C.",
    });

    // Estado para las imágenes de cada categoría
    const [imagenes, setImagenes] = useState({
        frutoMaduro: "/api/placeholder/300/200",
        frutoVerde: "/api/placeholder/300/200",
        frutoMonilia: "/api/placeholder/300/200",
        frutoOidiosis: "/api/placeholder/300/200",
        frutoTiro: "/api/placeholder/300/200",
        hojaTaphrina: "/api/placeholder/300/200"
    });

    // Función para cambiar la imagen (simulación, en producción se conectaría con backend)
    const cambiarImagen = (tipo) => {
        // Simula cambio de imagen (en producción aquí se conectaría con el backend)
        const nuevasImagenes = {...imagenes};
        nuevasImagenes[tipo] = `/api/placeholder/300/200?random=${Math.random()}`;
        setImagenes(nuevasImagenes);
    };

    const [isLoading, setIsLoading] = useState(false);

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
            alert(data.message || "Análissis completado con éxito");            
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
                    className="w-full bg-gray-200 hover:bg-blue-50 text-gray-700 py-3 px-4 rounded shadow">
                    Dashboard
                </button>
                </div>
                
                <div className="px-4 py-2">
                <button 
                    onClick={() => navigate('/imagenes-detectadas')}
                    className="w-full bg-blue-100 text-blue-800 py-3 px-4 rounded shadow">
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

            {/* Contenido principal */}
            <div className="flex-1 p-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Imágenes Detectadas</h1>
                    <p className="text-gray-600">Visualización de imágenes por categoría</p>
                </div>

                {/* Grid de imágenes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Fruto Maduro */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative">
                            <img 
                                src={imagenes.frutoMaduro} 
                                alt="Fruto Maduro" 
                                className="w-full h-48 object-cover"
                            />
                            <button 
                                onClick={() => cambiarImagen('frutoMaduro')}
                                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Fruto Maduro</h2>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Saludable</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-2">Ejemplar de fruto en estado óptimo de maduración</p>
                        </div>
                    </div>

                    {/* Fruto Verde */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative">
                            <img 
                                src={imagenes.frutoVerde} 
                                alt="Fruto Verde" 
                                className="w-full h-48 object-cover"
                            />
                            <button 
                                onClick={() => cambiarImagen('frutoVerde')}
                                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Fruto Verde</h2>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">En desarrollo</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-2">Fruto en etapa de crecimiento y maduración</p>
                        </div>
                    </div>

                    {/* Fruto Monilia */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative">
                            <img 
                                src={imagenes.frutoMonilia} 
                                alt="Fruto Monilia" 
                                className="w-full h-48 object-cover"
                            />
                            <button 
                                onClick={() => cambiarImagen('frutoMonilia')}
                                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Fruto Monilia</h2>
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Enfermedad</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-2">Fruto afectado por hongo Moniliophthora</p>
                        </div>
                    </div>

                    {/* Fruto Oidiosis */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative">
                            <img 
                                src={imagenes.frutoOidiosis} 
                                alt="Fruto Oidiosis" 
                                className="w-full h-48 object-cover"
                            />
                            <button 
                                onClick={() => cambiarImagen('frutoOidiosis')}
                                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Fruto Oidiosis</h2>
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Enfermedad</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-2">Fruto con síntomas de oídio (cenicilla)</p>
                        </div>
                    </div>

                    {/* Fruto Tiro */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative">
                            <img 
                                src={imagenes.frutoTiro} 
                                alt="Fruto Tiro" 
                                className="w-full h-48 object-cover"
                            />
                            <button 
                                onClick={() => cambiarImagen('frutoTiro')}
                                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Fruto Tiro</h2>
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Daño</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-2">Fruto con síntoma de mancha bacteriana</p>
                        </div>
                    </div>

                    {/* Hoja Taphrina */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative">
                            <img 
                                src={imagenes.hojaTaphrina} 
                                alt="Hoja Taphrina" 
                                className="w-full h-48 object-cover"
                            />
                            <button 
                                onClick={() => cambiarImagen('hojaTaphrina')}
                                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Hoja Taphrina</h2>
                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Infección</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-2">Hoja afectada por hongo Taphrina deformans</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}