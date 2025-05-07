import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert,
  Scissors,
  SprayCan,
  Leaf,
  Droplets,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  CheckCircle2
} from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [userData] = useState({
        usuario: "Ariel Choque C.",
    });

    const [isLoading, setIsLoading] = useState(false);

    const [expandedItems, setExpandedItems] = useState({});

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
            alert(data.message || "Análisis completado con éxito");        
        } catch (error) {
            console.error("Error al procesar:", error);
            alert(error.message || "Ocurrió un error durante el análisis");
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle para expandir/colapsar items
    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Datos de acciones recomendadas para cada enfermedad
    const [recomendaciones] = useState([
        {
            id: 1,
            enfermedad: 'Monilia',
            nombreCientifico: 'Monilinia fructicola',
            afecta: 'Frutos',
            prioridad: 'alta',
            descripcion: 'La moniliasis o pudrición parda es una enfermedad fúngica que afecta principalmente a los frutos del durazno. Se caracteriza por manchas marrones que crecen rápidamente, cubriendo todo el fruto y produciendo estructuras polvorientas de color gris o marrón.',
            acciones: [
                {
                    tipo: 'preventiva',
                    titulo: 'Poda sanitaria',
                    descripcion: 'Realizar podas para mejorar la ventilación y reducir la humedad en el árbol.',
                    pasos: [
                        'Eliminar ramas muertas, enfermas o cruzadas.',
                        'Desinfectar las herramientas de poda entre cada corte.',
                        'Quemar o enterrar lejos del huerto el material podado.'
                    ]
                },
                {
                    tipo: 'control',
                    titulo: 'Eliminar frutos afectados',
                    descripcion: 'Retirar y destruir todos los frutos con síntomas de monilia.',
                    pasos: [
                        'Recolectar frutos caídos y afectados en el árbol.',
                        'Colocarlos en bolsas cerradas para evitar dispersión de esporas.',
                        'Enterrarlos a más de 30 cm de profundidad o quemarlos.'
                    ]
                },
                {
                    tipo: 'quimica',
                    titulo: 'Tratamiento fungicida',
                    descripcion: 'Aplicar fungicidas específicos durante la floración y desarrollo del fruto.',
                    pasos: [
                        'Aplicar fungicidas a base de captan, trifloxistrobin o tebuconazol.',
                        'Realizar aplicaciones cada 7-14 días durante periodos críticos.',
                        'Alternar productos con diferentes mecanismos de acción para evitar resistencias.'
                    ]
                }
            ]
        },
        {
            id: 2,
            enfermedad: 'Oidiosis',
            nombreCientifico: 'Podosphaera pannosa',
            afecta: 'Frutos, hojas y brotes',
            prioridad: 'media',
            descripcion: 'También conocido como "cenicilla" o "mal blanco", es una enfermedad fúngica que se manifiesta como un polvo blanquecino sobre la superficie de hojas, brotes y frutos. Causa deformación y puede reducir significativamente la calidad de los frutos.',
            acciones: [
                {
                    tipo: 'preventiva',
                    titulo: 'Manejo cultural',
                    descripcion: 'Prácticas que reducen la incidencia y severidad de la enfermedad.',
                    pasos: [
                        'Mantener una buena ventilación mediante podas adecuadas.',
                        'Evitar exceso de fertilización nitrogenada.',
                        'Eliminar restos de poda y follaje afectado del huerto.'
                    ]
                },
                {
                    tipo: 'control',
                    titulo: 'Monitoreo y detección temprana',
                    descripcion: 'Inspección regular para detectar los primeros síntomas.',
                    pasos: [
                        'Revisar semanalmente hojas jóvenes y frutos en desarrollo.',
                        'Buscar manchas blanquecinas con apariencia polvorienta.',
                        'Actuar inmediatamente al detectar los primeros síntomas.'
                    ]
                },
                {
                    tipo: 'quimica',
                    titulo: 'Aplicación de fungicidas',
                    descripcion: 'Tratamientos químicos para control y prevención.',
                    pasos: [
                        'Aplicar azufre en polvo o productos a base de azufre.',
                        'Utilizar fungicidas sistémicos como miclobutanil o trifloxistrobin.',
                        'Realizar aplicaciones cada 10-14 días durante la primavera y verano.'
                    ]
                },
                {
                    tipo: 'biologica',
                    titulo: 'Control biológico',
                    descripcion: 'Uso de microorganismos antagonistas.',
                    pasos: [
                        'Aplicar productos a base de Bacillus subtilis.',
                        'Utilizar extractos de plantas como el aceite de neem.',
                        'Fomentar la presencia de enemigos naturales en el huerto.'
                    ]
                }
            ]
        },
        {
            id: 3,
            enfermedad: 'Tiro de Munición',
            nombreCientifico: 'Wilsonomyces carpophilus',
            afecta: 'Frutos, hojas y brotes',
            prioridad: 'media',
            descripcion: 'Enfermedad fúngica caracterizada por pequeñas lesiones circulares en hojas y frutos que eventualmente se desprenden dejando perforaciones similares a disparos, de ahí su nombre "tiro de munición".',
            acciones: [
                {
                    tipo: 'preventiva',
                    titulo: 'Medidas sanitarias',
                    descripcion: 'Reducir la presencia del patógeno y su propagación.',
                    pasos: [
                        'Recoger y eliminar hojas caídas al final del otoño.',
                        'Podar ramas afectadas para mejorar aireación.',
                        'Mantener el suelo libre de malezas que puedan ser hospederas.'
                    ]
                },
                {
                    tipo: 'control',
                    titulo: 'Manejo de riego',
                    descripcion: 'Ajustes en el manejo hídrico para reducir la enfermedad.',
                    pasos: [
                        'Evitar riego por aspersión que moje el follaje.',
                        'Preferir riego por goteo o microaspersión dirigido al suelo.',
                        'Regar en las primeras horas de la mañana para que el follaje se seque rápidamente.'
                    ]
                },
                {
                    tipo: 'quimica',
                    titulo: 'Aplicación de fungicidas preventivos',
                    descripcion: 'Tratamientos químicos para proteger el cultivo.',
                    pasos: [
                        'Aplicar fungicidas cúpricos (oxicloruro de cobre) durante la caída de hojas.',
                        'Usar clorotalonil o ziram antes de períodos de lluvia.',
                        'Realizar aplicaciones en primavera, antes de la aparición de síntomas.'
                    ]
                }
            ]
        },
        {
            id: 4,
            enfermedad: 'Taphrina (Torque)',
            nombreCientifico: 'Taphrina deformans',
            afecta: 'Hojas',
            prioridad: 'alta',
            descripcion: 'Conocida como "torque" o "lepra del duraznero", esta enfermedad fúngica causa deformación y engrosamiento de hojas, que adquieren coloraciones rojizas o amarillentas. Puede causar defoliación severa si no se controla tempranamente.',
            acciones: [
                {
                    tipo: 'preventiva',
                    titulo: 'Aplicación preventiva',
                    descripcion: 'Tratamientos preventivos en momentos críticos.',
                    pasos: [
                        'Aplicar fungicidas preventivos al 50% de caída de hojas en otoño.',
                        'Realizar una segunda aplicación al 100% de caída de hojas.',
                        'Aplicar nuevamente al hinchamiento de yemas antes de brotación.'
                    ]
                },
                {
                    tipo: 'control',
                    titulo: 'Eliminación de inóculo',
                    descripcion: 'Reducir fuentes de reinfección.',
                    pasos: [
                        'Recolectar y destruir hojas deformes tan pronto aparezcan.',
                        'Podar selectivamente ramas con alta incidencia de la enfermedad.',
                        'Eliminar hojas caídas del suelo al final de temporada.'
                    ]
                },
                {
                    tipo: 'quimica',
                    titulo: 'Control químico',
                    descripcion: 'Fungicidas específicos para Taphrina deformans.',
                    pasos: [
                        'Aplicar productos a base de cobre (oxicloruro o hidróxido).',
                        'Utilizar ziram o dodine como alternativas.',
                        'Realizar la aplicación cuando las yemas comienzan a hincharse, antes de la apertura.'
                    ]
                },
                {
                    tipo: 'nutricion',
                    titulo: 'Fortalecer el árbol',
                    descripcion: 'Mejorar la resistencia natural del árbol.',
                    pasos: [
                        'Aplicar fertilización equilibrada con énfasis en potasio y calcio.',
                        'Utilizar bioestimulantes para mejorar el vigor de la planta.',
                        'Aplicar enmiendas orgánicas para mejorar la estructura del suelo.'
                    ]
                }
            ]
        }
    ]);

    // Iconos para tipos de acción
    const getIconoAccion = (tipo) => {
        switch(tipo) {
            case 'preventiva':
                return <ShieldAlert size={18} className="text-blue-600" />;
            case 'control':
                return <Scissors size={18} className="text-yellow-600" />;
            case 'quimica':
                return <SprayCan size={18} className="text-purple-600" />;
            case 'biologica':
                return <Leaf size={18} className="text-green-600" />;
            case 'nutricion':
                return <Droplets size={18} className="text-teal-600" />;
            default:
                return <HelpCircle size={18} className="text-gray-600" />;
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
                    className="w-full bg-blue-100 text-blue-800 py-3 px-4 rounded shadow">
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
                {/* Encabezado */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Acciones Recomendadas</h1>
                    <p className="text-gray-600">Guía de manejo para enfermedades del durazno detectadas</p>
                </div>

                {/* Lista de enfermedades y acciones */}
                <div className="space-y-6">
                    {recomendaciones.map((enfermedad) => (
                        <div key={enfermedad.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Cabecera de enfermedad */}
                            <div className={`p-5 ${
                                enfermedad.prioridad === 'alta' ? 'bg-red-50 border-l-4 border-red-500' : 
                                enfermedad.prioridad === 'media' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 
                                'bg-blue-50 border-l-4 border-blue-500'
                            }`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">{enfermedad.enfermedad}</h2>
                                        <p className="text-sm text-gray-600 italic">{enfermedad.nombreCientifico}</p>
                                        <div className="flex items-center mt-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                                                Afecta: {enfermedad.afecta}
                                            </span>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                enfermedad.prioridad === 'alta' ? 'bg-red-100 text-red-800' : 
                                                enfermedad.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                Prioridad: {enfermedad.prioridad.charAt(0).toUpperCase() + enfermedad.prioridad.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => toggleExpand(enfermedad.id)}
                                        className="p-1 rounded-full hover:bg-gray-200"
                                    >
                                        {expandedItems[enfermedad.id] ? 
                                            <ChevronUp size={20} className="text-gray-600" /> : 
                                            <ChevronDown size={20} className="text-gray-600" />
                                        }
                                    </button>
                                </div>
                                <p className="mt-3 text-gray-700">{enfermedad.descripcion}</p>
                            </div>

                            {/* Contenido expandible */}
                            {expandedItems[enfermedad.id] && (
                                <div className="p-5">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Acciones Recomendadas</h3>
                                    <div className="space-y-6">
                                        {enfermedad.acciones.map((accion, idx) => (
                                            <div key={idx} className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-start">
                                                    <div className="mr-3 mt-1">
                                                        {getIconoAccion(accion.tipo)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">{accion.titulo}</h4>
                                                        <p className="text-gray-600 mt-1">{accion.descripcion}</p>
                                                        
                                                        <h5 className="text-sm font-medium text-gray-700 mt-3 mb-2 flex items-center">
                                                            <ClipboardList size={16} className="mr-1 text-gray-500" />
                                                            Pasos a seguir:
                                                        </h5>
                                                        <ul className="space-y-2">
                                                            {accion.pasos.map((paso, pasoIdx) => (
                                                                <li key={pasoIdx} className="flex items-start">
                                                                    <CheckCircle2 size={16} className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                                                                    <span className="text-gray-700">{paso}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}