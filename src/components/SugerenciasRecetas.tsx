import React, { useState, useEffect } from 'react';
import { Utensils, Filter, Eye } from 'lucide-react';
import { Alimento, Receta } from '../types';
import { recetas } from '../data/recetas';

interface SugerenciasRecetasProps {
  alimentos: Alimento[];
  modoOscuro: boolean;
}

interface PreferenciasDieteticas {
  vegetariano: boolean;
  vegano: boolean;
  sinGluten: boolean;
  sinLactosa: boolean;
}

const SugerenciasRecetas: React.FC<SugerenciasRecetasProps> = ({ alimentos, modoOscuro }) => {
  const [recetasSugeridas, setRecetasSugeridas] = useState<Receta[]>([]);
  const [preferenciasDieteticas, setPreferenciasDieteticas] = useState<PreferenciasDieteticas>({
    vegetariano: false,
    vegano: false,
    sinGluten: false,
    sinLactosa: false,
  });
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(null);

  useEffect(() => {
    const preferenciasGuardadas = localStorage.getItem('preferenciasDieteticas');
    if (preferenciasGuardadas) {
      setPreferenciasDieteticas(JSON.parse(preferenciasGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('preferenciasDieteticas', JSON.stringify(preferenciasDieteticas));
  }, [preferenciasDieteticas]);

  useEffect(() => {
    generarSugerencias();
  }, [alimentos, preferenciasDieteticas]);

  const filtrarRecetasPorPreferencias = (recetasDisponibles: Receta[]): Receta[] => {
    const hayPreferenciasSeleccionadas = Object.values(preferenciasDieteticas).some(value => value);
    
    if (!hayPreferenciasSeleccionadas) {
      return recetasDisponibles.filter(receta => 
        !receta.vegetariano && !receta.vegano && !receta.sinGluten && !receta.sinLactosa
      );
    }

    return recetasDisponibles.filter(receta => {
      if (preferenciasDieteticas.vegetariano && !receta.vegetariano) return false;
      if (preferenciasDieteticas.vegano && !receta.vegano) return false;
      if (preferenciasDieteticas.sinGluten && !receta.sinGluten) return false;
      if (preferenciasDieteticas.sinLactosa && !receta.sinLactosa) return false;
      return true;
    });
  };

  const generarSugerencias = () => {
    const alimentosDisponibles = new Set(alimentos.map(a => a.nombre.toLowerCase()));
    const alimentosOrdenados = [...alimentos].sort((a, b) => 
      new Date(a.fechaCaducidad).getTime() - new Date(b.fechaCaducidad).getTime()
    );
    
    let recetasDisponibles = recetas.filter(receta => 
      receta.ingredientes.some(ingrediente => alimentosDisponibles.has(ingrediente.toLowerCase()))
    );
    
    recetasDisponibles = filtrarRecetasPorPreferencias(recetasDisponibles);
    
    recetasDisponibles.sort((a, b) => {
      const aUsoProximoACaducar = a.ingredientes.some(ingrediente => 
        alimentosOrdenados.findIndex(alimento => 
          alimento.nombre.toLowerCase() === ingrediente.toLowerCase()
        ) < 3
      );
      const bUsoProximoACaducar = b.ingredientes.some(ingrediente => 
        alimentosOrdenados.findIndex(alimento => 
          alimento.nombre.toLowerCase() === ingrediente.toLowerCase()
        ) < 3
      );
      return bUsoProximoACaducar ? 1 : aUsoProximoACaducar ? -1 : 0;
    });
    
    setRecetasSugeridas(recetasDisponibles.slice(0, 6));
  };

  const togglePreferencia = (preferencia: keyof PreferenciasDieteticas) => {
    setPreferenciasDieteticas(prev => {
      const nuevasPreferencias = { ...prev };
      
      if (preferencia === 'vegano' && !prev.vegano) {
        nuevasPreferencias.vegetariano = false;
        nuevasPreferencias.vegano = true;
      }
      else if (preferencia === 'vegetariano' && !prev.vegetariano) {
        nuevasPreferencias.vegano = false;
        nuevasPreferencias.vegetariano = true;
      }
      else {
        nuevasPreferencias[preferencia] = !prev[preferencia];
      }
      
      return nuevasPreferencias;
    });
  };

  const verReceta = (receta: Receta) => {
    setRecetaSeleccionada(receta);
  };

  return (
    <div className={`${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
      <h2 className={`text-xl font-semibold ${modoOscuro ? 'text-white' : 'text-green-700'} mb-4 flex items-center`}>
        <Utensils className="mr-2" />
        Sugerencias de Recetas
      </h2>
      <div className="mb-4 flex flex-wrap items-center">
        <Filter className="mr-2" />
        <span className={`mr-4 ${modoOscuro ? 'text-white' : 'text-gray-700'}`}>Preferencias dietéticas:</span>
        {Object.entries(preferenciasDieteticas).map(([key, value]) => (
          <button
            key={key}
            onClick={() => togglePreferencia(key as keyof PreferenciasDieteticas)}
            className={`mr-2 mb-2 px-3 py-1 rounded ${
              value
                ? modoOscuro
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white'
                : modoOscuro
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {key === 'sinGluten' ? 'Sin Gluten' : key === 'sinLactosa' ? 'Sin Lactosa' : key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recetasSugeridas.length > 0 ? (
          recetasSugeridas.map(receta => (
            <div 
              key={receta.id} 
              className={`p-4 rounded-lg ${modoOscuro ? 'bg-gray-700' : 'bg-gray-100'} flex flex-col`}
              style={{ height: '160px' }}
            >
              <div className="flex-1 mb-2">
                <h3 className={`font-semibold ${modoOscuro ? 'text-white' : 'text-gray-800'} mb-1 line-clamp-1`}>
                  {receta.nombre}
                </h3>
                <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'} text-sm line-clamp-2`}>
                  Ingredientes principales: {receta.ingredientes.slice(0, 3).join(', ')}...
                </p>
              </div>
              <button
                onClick={() => verReceta(receta)}
                className={`${
                  modoOscuro ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                } text-white font-bold py-2 px-4 rounded text-sm flex items-center justify-center w-full`}
              >
                <Eye size={16} className="mr-1" />
                Ver receta
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-4">
            <p className={`${modoOscuro ? 'text-gray-400' : 'text-gray-600'}`}>
              No se encontraron recetas que coincidan con tus preferencias.
            </p>
          </div>
        )}
      </div>
      {recetaSeleccionada && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
          <div className={`${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-xl font-semibold ${modoOscuro ? 'text-white' : 'text-green-700'} mb-4`}>
              {recetaSeleccionada.nombre}
            </h3>
            <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              Ingredientes: {recetaSeleccionada.ingredientes.join(', ')}
            </p>
            <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'} mb-4 whitespace-pre-line`}>
              {recetaSeleccionada.instrucciones}
            </p>
            <div className={`flex justify-between ${modoOscuro ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              <span>Tiempo de preparación: {recetaSeleccionada.tiempoPreparacion} min</span>
              <span>Dificultad: {recetaSeleccionada.dificultad}</span>
            </div>
            <button
              onClick={() => setRecetaSeleccionada(null)}
              className={`w-full ${
                modoOscuro ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
              } text-white font-bold py-2 px-4 rounded`}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SugerenciasRecetas;