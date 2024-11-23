import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import { Alimento } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ListaAlimentosProps {
  alimentos: Alimento[];
  onEliminar: (id: number) => void;
  onEditar: (id: number) => void;
  modoOscuro: boolean;
}

const ListaAlimentos: React.FC<ListaAlimentosProps> = ({ alimentos, onEliminar, onEditar, modoOscuro }) => {
  // Función para determinar el color del texto según la fecha de caducidad
  const getFechaColor = (fechaCaducidad: string) => {
    const diasHastaCaducidad = Math.ceil((new Date(fechaCaducidad).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (diasHastaCaducidad < 0) return 'text-red-500'; // Caducado
    if (diasHastaCaducidad <= 3) return 'text-yellow-500'; // Próximo a caducar
    return modoOscuro ? 'text-gray-300' : 'text-gray-600'; // Normal
  };

  // Manejador para el evento de eliminar
  const handleEliminarClick = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    onEliminar(id);
  };

  return (
    // Contenedor principal con scroll
    <div className="overflow-y-auto pr-2" style={{ maxHeight: '60vh' }}>
      {alimentos.length === 0 ? (
        // Mensaje cuando no hay alimentos
        <p className={`text-center ${modoOscuro ? 'text-gray-300' : 'text-gray-500'}`}>
          No hay alimentos en la lista. ¡Añade algunos!
        </p>
      ) : (
        // Lista de alimentos con animaciones
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {alimentos.map((alimento) => (
              <motion.div
                key={`alimento-${alimento.id}-${alimento.nombre}`}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className={`py-4 flex justify-between items-center border-b ${
                  modoOscuro ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                {/* Información del alimento */}
                <div>
                  <p className={`font-semibold ${modoOscuro ? 'text-white' : 'text-gray-800'}`}>
                    {alimento.nombre}
                  </p>
                  <p className={`text-sm ${getFechaColor(alimento.fechaCaducidad)}`}>
                    Caducidad: {alimento.fechaCaducidad}
                  </p>
                  <p className={`text-sm ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
                    Cantidad: {alimento.cantidad} | Categoría: {alimento.categoria}
                  </p>
                </div>
                {/* Botones de acción */}
                <div className="flex space-x-2 mr-2">
                  <button
                    onClick={() => onEditar(alimento.id)}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                    aria-label={`Editar ${alimento.nombre}`}
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={(e) => handleEliminarClick(e, alimento.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                    aria-label={`Eliminar ${alimento.nombre}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ListaAlimentos;