import React, { useState, useEffect } from 'react';
import { Bell, X, Trash2 } from 'lucide-react';
import { Alimento } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificacionesProps {
  alimentos: Alimento[];
  modoOscuro: boolean;
  onClose: () => void;
  notificacionesLeidas: Set<number>;
  notificacionesEliminadas: Set<number>;
  onLimpiarNotificaciones: () => void;
}

interface Notificacion {
  id: number;
  mensaje: string;
  tipo: 'caducado' | 'porCaducar';
  alimentoId: number;
}

const Notificaciones: React.FC<NotificacionesProps> = ({ 
  alimentos, 
  modoOscuro, 
  onClose,
  notificacionesLeidas,
  notificacionesEliminadas,
  onLimpiarNotificaciones
}) => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  useEffect(() => {
    const fechaActual = new Date();
    const nuevasNotificaciones: Notificacion[] = [];

    alimentos.forEach((alimento) => {
      if (!notificacionesEliminadas.has(alimento.id)) {
        const fechaCaducidad = new Date(alimento.fechaCaducidad);
        if (fechaCaducidad <= fechaActual) {
          nuevasNotificaciones.push({
            id: Date.now() + Math.random(),
            mensaje: `¡${alimento.nombre} ha caducado!`,
            tipo: 'caducado',
            alimentoId: alimento.id
          });
        } else {
          const diasHastaCaducidad = Math.ceil((fechaCaducidad.getTime() - fechaActual.getTime()) / (1000 * 3600 * 24));
          if (diasHastaCaducidad > 0 && diasHastaCaducidad <= 3) {
            nuevasNotificaciones.push({
              id: Date.now() + Math.random(),
              mensaje: `${alimento.nombre} caducará en ${diasHastaCaducidad} día${diasHastaCaducidad !== 1 ? 's' : ''}`,
              tipo: 'porCaducar',
              alimentoId: alimento.id
            });
          }
        }
      }
    });

    setNotificaciones(nuevasNotificaciones);
  }, [alimentos, notificacionesEliminadas]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden max-w-md w-full`}
        style={{ maxHeight: '80vh' }}
      >
        <div className={`p-4 ${modoOscuro ? 'bg-gray-700' : 'bg-gray-100'} flex justify-between items-center sticky top-0 z-10`}>
          <div className="flex items-center">
            <Bell className="mr-2" size={20} />
            <h3 className="font-semibold">Notificaciones</h3>
            {notificaciones.length > 0 && (
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                modoOscuro ? 'bg-gray-600' : 'bg-gray-200'
              }`}>
                {notificaciones.length}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {notificaciones.length > 0 && (
              <button
                onClick={onLimpiarNotificaciones}
                className={`p-1 rounded-full hover:${modoOscuro ? 'bg-gray-600' : 'bg-gray-200'} text-red-500`}
                title="Limpiar todas las notificaciones"
              >
                <Trash2 size={20} />
              </button>
            )}
            <button
              onClick={onClose}
              className={`p-1 rounded-full hover:${modoOscuro ? 'bg-gray-600' : 'bg-gray-200'}`}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 4rem)' }}>
          {notificaciones.length === 0 ? (
            <p className={`p-4 text-center ${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}>
              No hay notificaciones nuevas
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              <AnimatePresence>
                {notificaciones.map((notificacion) => (
                  <motion.li
                    key={notificacion.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`relative ${
                      notificacion.tipo === 'caducado'
                        ? modoOscuro
                          ? 'bg-red-900/50 text-red-200'
                          : 'bg-red-50 text-red-800'
                        : modoOscuro
                        ? 'bg-yellow-900/50 text-yellow-200'
                        : 'bg-yellow-50 text-yellow-800'
                    }`}
                  >
                    <div className="p-4">
                      {notificacion.mensaje}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notificaciones;