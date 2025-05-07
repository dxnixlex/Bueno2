import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Thermometer, Droplets, Wind, CloudRain, Sun, Gauge, Leaf, MapPin } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [userData] = useState({
        usuario: "Ariel Choque C.",
    });

    // Datos meteorológicos de ejemplo
    const [weatherData] = useState({
        temperature: 24.8,
        temperature_diff: +0.5,
        temperature_max: 28.2,
        temperature_min: 19.0,
        humidity: 68,
        pressure: 1015,
        windSpeed: 12.4,
        windDirection: "NE",
        precipitation: 2.5,
        solarRadiation: 782,
        soilMoisture: 32,
        location: "Cochabamba, Bolivia",
        lastUpdate: "27/04/2025 14:30"
    });

    // Datos para el gráfico de tendencias
    const chartData = [
        { time: "06:00", temp: 19, humidity: 80 },
        { time: "09:00", temp: 21, humidity: 70 },
        { time: "12:00", temp: 25, humidity: 60 },
        { time: "15:00", temp: 26, humidity: 55 },
        { time: "18:00", temp: 24, humidity: 65 },
        { time: "21:00", temp: 20, humidity: 75 }
    ];

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
                    className="w-full bg-blue-100 text-blue-800 py-3 px-4 rounded shadow">
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
                <div className="bg-white rounded-lg shadow-sm p-8">
                    {/* Encabezado */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-xl font-medium text-gray-800">Estación Meteorológica</h1>
                            <div className="flex items-center mt-1 text-gray-500 text-sm">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{weatherData.location}</span>
                                <span className="mx-2">•</span>
                                <span>Actualizado: {weatherData.lastUpdate}</span>
                            </div>
                        </div>
                        <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                            <div className="w-10 h-10 mr-2 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 19C6 19.5523 5.55228 20 5 20C4.44772 20 4 19.5523 4 19C4 18.4477 4.44772 18 5 18C5.55228 18 6 18.4477 6 19Z" fill="currentColor"/>
                                    <path d="M12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18Z" fill="currentColor"/>
                                    <path d="M18 19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18C18.4477 18 18 18.4477 18 19Z" fill="currentColor"/>
                                    <path d="M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12Z" fill="currentColor"/>
                                    <path d="M12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11Z" fill="currentColor"/>
                                    <path d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z" fill="currentColor"/>
                                    <path d="M6 5C6 5.55228 5.55228 6 5 6C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4C5.55228 4 6 4.44772 6 5Z" fill="currentColor"/>
                                    <path d="M12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4Z" fill="currentColor"/>
                                    <path d="M18 5C18 5.55228 18.4477 6 19 6C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4C18.4477 4 18 4.44772 18 5Z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div>
                                <div className="text-xl font-semibold text-gray-800">{weatherData.temperature}°C</div>
                                <div className="text-xs text-gray-500">Parcialmente nublado</div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjetas de información principal - Primera fila */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Temperatura */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center mb-2">
                                <h2 className="text-sm font-medium text-gray-600">Temperatura</h2>
                                <div className="ml-2 bg-red-50 p-1 rounded-full">
                                    <Thermometer className="w-4 h-4 text-red-400" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">{weatherData.temperature}°C</span>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                                <span className="text-green-500">↑ {weatherData.temperature_max}°C</span>
                                <span className="mx-2">•</span>
                                <span className="text-blue-500">↓ {weatherData.temperature_min}°C</span>
                            </div>
                        </div>

                        {/* Humedad del Aire */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center mb-2">
                                <h2 className="text-sm font-medium text-gray-600">Humedad del Aire</h2>
                                <div className="ml-2 bg-blue-50 p-1 rounded-full">
                                    <Droplets className="w-4 h-4 text-blue-400" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">{weatherData.humidity}%</span>
                            </div>
                        </div>

                        {/* Presión Atmosférica */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center mb-2">
                                <h2 className="text-sm font-medium text-gray-600">Presión Atmosférica</h2>
                                <div className="ml-2 bg-purple-50 p-1 rounded-full">
                                    <Gauge className="w-4 h-4 text-purple-400" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">{weatherData.pressure}</span>
                                <span className="text-xs ml-1 text-gray-500">hPa</span>
                            </div>
                        </div>

                        {/* Velocidad del Viento */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center mb-2">
                                <h2 className="text-sm font-medium text-gray-600">Velocidad del Viento</h2>
                                <div className="ml-2 bg-gray-50 p-1 rounded-full">
                                    <Wind className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">{weatherData.windSpeed}</span>
                                <span className="text-xs ml-1 text-gray-500">km/h</span>
                                <span className="text-xs ml-2 text-gray-500">{weatherData.windDirection}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tarjetas de información secundaria - Segunda fila */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Precipitación */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center mb-2">
                                <h2 className="text-sm font-medium text-gray-600">Precipitación</h2>
                                <div className="ml-2 bg-blue-50 p-1 rounded-full">
                                    <CloudRain className="w-4 h-4 text-blue-400" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">{weatherData.precipitation}</span>
                                <span className="text-xs ml-1 text-gray-500">mm</span>
                            </div>
                        </div>

                        {/* Radiación Solar */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center mb-2">
                                <h2 className="text-sm font-medium text-gray-600">Radiación Solar</h2>
                                <div className="ml-2 bg-yellow-50 p-1 rounded-full">
                                    <Sun className="w-4 h-4 text-yellow-400" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">{weatherData.solarRadiation}</span>
                                <span className="text-xs ml-1 text-gray-500">W/m²</span>
                            </div>
                        </div>

                        {/* Humedad del Suelo */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center mb-2">
                                <h2 className="text-sm font-medium text-gray-600">Humedad del Suelo</h2>
                                <div className="ml-2 bg-green-50 p-1 rounded-full">
                                    <Leaf className="w-4 h-4 text-green-400" />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-2xl font-bold">{weatherData.soilMoisture}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Gráfico de tendencias de temperatura y humedad */}
                    <div className="mt-6">
                        <h2 className="text-sm font-medium text-gray-600 mb-4">Tendencia de Temperatura y Humedad (24h)</h2>
                        <div className="relative h-64 w-full">
                            {/* Este es un gráfico simulado con HTML/CSS. En un proyecto real usarías recharts o similar */}
                            <div className="absolute inset-0">
                                {/* Líneas de cuadrícula horizontales */}
                                <div className="absolute w-full h-px bg-gray-200" style={{ top: '0%' }}></div>
                                <div className="absolute w-full h-px bg-gray-200" style={{ top: '20%' }}></div>
                                <div className="absolute w-full h-px bg-gray-200" style={{ top: '40%' }}></div>
                                <div className="absolute w-full h-px bg-gray-200" style={{ top: '60%' }}></div>
                                <div className="absolute w-full h-px bg-gray-200" style={{ top: '80%' }}></div>
                                <div className="absolute w-full h-px bg-gray-200" style={{ top: '100%' }}></div>
                                
                                {/* Líneas de cuadrícula verticales */}
                                {chartData.map((point, index) => (
                                    <div key={index} className="absolute h-full w-px bg-gray-200" 
                                        style={{ left: `${index * (100 / (chartData.length - 1))}%` }}>
                                    </div>
                                ))}
                                
                                {/* Etiquetas de hora */}
                                {chartData.map((point, index) => (
                                    <div key={index} className="absolute text-xs text-gray-500" 
                                        style={{ left: `${index * (100 / (chartData.length - 1))}%`, bottom: '-20px', transform: 'translateX(-50%)' }}>
                                        {point.time}
                                    </div>
                                ))}
                                
                                {/* Etiquetas del eje Y (izquierda - temperatura) */}
                                <div className="absolute text-xs text-gray-500" style={{ left: '-25px', top: '0%', transform: 'translateY(-50%)' }}>28</div>
                                <div className="absolute text-xs text-gray-500" style={{ left: '-25px', top: '25%', transform: 'translateY(-50%)' }}>21</div>
                                <div className="absolute text-xs text-gray-500" style={{ left: '-25px', top: '50%', transform: 'translateY(-50%)' }}>14</div>
                                <div className="absolute text-xs text-gray-500" style={{ left: '-25px', top: '75%', transform: 'translateY(-50%)' }}>7</div>
                                <div className="absolute text-xs text-gray-500" style={{ left: '-25px', top: '100%', transform: 'translateY(-50%)' }}>0</div>
                                
                                {/* Etiquetas del eje Y (derecha - humedad) */}
                                <div className="absolute text-xs text-gray-500" style={{ right: '-25px', top: '0%', transform: 'translateY(-50%)' }}>80</div>
                                <div className="absolute text-xs text-gray-500" style={{ right: '-25px', top: '25%', transform: 'translateY(-50%)' }}>60</div>
                                <div className="absolute text-xs text-gray-500" style={{ right: '-25px', top: '50%', transform: 'translateY(-50%)' }}>40</div>
                                <div className="absolute text-xs text-gray-500" style={{ right: '-25px', top: '75%', transform: 'translateY(-50%)' }}>20</div>
                                <div className="absolute text-xs text-gray-500" style={{ right: '-25px', top: '100%', transform: 'translateY(-50%)' }}>0</div>
                                
                                {/* Línea de temperatura (roja) */}
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                    <polyline 
                                        points={chartData.map((point, index) => 
                                            `${index * (100 / (chartData.length - 1))}% ${100 - (point.temp / 28) * 100}%`
                                        ).join(' ')}
                                        fill="none"
                                        stroke="#f87171"
                                        strokeWidth="2"
                                    />
                                    {chartData.map((point, index) => (
                                        <circle 
                                            key={index}
                                            cx={`${index * (100 / (chartData.length - 1))}%`} 
                                            cy={`${100 - (point.temp / 28) * 100}%`} 
                                            r="3" 
                                            fill="#ef4444" 
                                        />
                                    ))}
                                </svg>
                                
                                {/* Línea de humedad (azul) */}
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                    <polyline 
                                        points={chartData.map((point, index) => 
                                            `${index * (100 / (chartData.length - 1))}% ${100 - (point.humidity / 80) * 100}%`
                                        ).join(' ')}
                                        fill="none"
                                        stroke="#60a5fa"
                                        strokeWidth="2"
                                    />
                                    {chartData.map((point, index) => (
                                        <circle 
                                            key={index}
                                            cx={`${index * (100 / (chartData.length - 1))}%`} 
                                            cy={`${100 - (point.humidity / 80) * 100}%`} 
                                            r="3" 
                                            fill="#3b82f6" 
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}