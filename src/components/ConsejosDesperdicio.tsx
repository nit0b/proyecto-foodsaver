import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { Alimento } from '../types';

interface ConsejosDesperdicio {
  modoOscuro: boolean;
  alimentos: Alimento[];
}

const consejos = [
  "Planifica tu dieta para comprar lo necesario.",
  "Almacena correctamente los alimentos para prolongar su vida útil.",
  "Congela los alimentos que no vayas a consumir pronto.",
  "Compra frutas y verduras de temporada para obtener mejor calidad y precio.",
  "Organiza tu nevera y despensa para tener visibles los alimentos más próximos a caducar.",
  "Comparte alimentos si tienes excedentes.",
  "Utiliza aplicaciones de rescate de alimentos para adquirir productos a punto de caducar.",
  "Usa los restos orgánicos para abonar las plantas.",
  "Aprende a conservar alimentos mediante técnicas como la deshidratación.",
  "Compra a granel para reducir el empaquetado y comprar solo lo necesario.",
  "Aprende a interpretar correctamente las fechas de caducidad y consumo preferente."
];

const ConsejosDesperdicio: React.FC<ConsejosDesperdicio> = ({ modoOscuro, alimentos }) => {
  const [consejosActuales, setConsejosActuales] = useState<string[]>([]);
  const [consejoPersonalizado, setConsejoPersonalizado] = useState<string | null>(null);

  useEffect(() => {
    const obtenerTresConsejosAleatorios = () => {
      const consejosAleatorios = [...consejos].sort(() => 0.5 - Math.random()).slice(0, 3);
      setConsejosActuales(consejosAleatorios);
    };

    obtenerTresConsejosAleatorios();
    const intervalo = setInterval(obtenerTresConsejosAleatorios, 10000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const generarConsejoPersonalizado = () => {
      const alimentosPorCaducar = alimentos.filter(alimento => {
        const fechaCaducidad = new Date(alimento.fechaCaducidad);
        const hoy = new Date();
        const diasHastaCaducidad = Math.ceil((fechaCaducidad.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
        return diasHastaCaducidad <= 3 && diasHastaCaducidad > 0;
      });

      if (alimentosPorCaducar.length > 0) {
        const alimentosCriticos = alimentosPorCaducar.map(a => a.nombre).join(', ');
        setConsejoPersonalizado(`¡Atención! Los siguientes alimentos van a caducar pronto: ${alimentosCriticos}. Úsalos en tus próximas comidas o congélalos si es posible.`);
      } else if (alimentos.length === 0) {
        setConsejoPersonalizado("Tu despensa está vacía. ¡Es un buen momento para planificar tus compras de la semana!");
      } else {
        setConsejoPersonalizado(null);
      }
    };

    generarConsejoPersonalizado();
  }, [alimentos]);

  return (
    <div className={`${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 w-full`}>
      <h2 className={`text-xl font-semibold ${modoOscuro ? 'text-white' : 'text-green-700'} mb-4 flex items-center`}>
        <Lightbulb className="mr-2" />
        Consejos para Reducir el Desperdicio
      </h2>
      {consejoPersonalizado && (
        <div className={`mb-6 p-4 rounded ${modoOscuro ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
          <p className="text-lg">{consejoPersonalizado}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {consejosActuales.map((consejo, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 ${
              modoOscuro ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-50 hover:bg-green-100'
            }`}
          >
            <p className={`flex items-start ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="text-green-500 mr-2 text-xl">•</span>
              {consejo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsejosDesperdicio;