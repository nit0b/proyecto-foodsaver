import React from 'react';
import { User, X, LogOut } from 'lucide-react';
import { Usuario } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

// Interfaz para las propiedades del componente PerfilUsuario
interface PerfilUsuarioProps {
  usuario: Usuario;
  modoOscuro: boolean;
  onClose?: () => void;
  onLogout?: () => void;
  compact?: boolean;
}

// Componente PerfilUsuario: Muestra información del usuario y opciones de sesión
const PerfilUsuario: React.FC<PerfilUsuarioProps> = ({ 
  usuario, 
  modoOscuro, 
  onClose, 
  onLogout, 
  compact = false 
}) => {
  // Contenido principal del perfil
  const content = (
    <>
      {/* Información del usuario */}
      <div className="mb-6">
        <motion.div 
          className={`p-4 rounded-lg ${modoOscuro ? 'bg-gray-700' : 'bg-green-50'}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-4 rounded-full ${modoOscuro ? 'bg-gray-600' : 'bg-green-100'}`}>
              <User className={modoOscuro ? 'text-white' : 'text-green-600'} size={24} />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${modoOscuro ? 'text-white' : 'text-gray-800'}`}>
                {usuario.nombre}
              </h3>
              <p className={`text-sm ${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                {usuario.email}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Botón de cerrar sesión */}
      {onLogout && (
        <button
          onClick={onLogout}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
            modoOscuro
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          } transition-colors duration-200`}
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      )}
    </>
  );

  // Renderizado condicional según el modo (compacto o completo)
  if (compact) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden w-80`}
        >
          {/* Cabecera del modal */}
          <div className={`p-4 ${modoOscuro ? 'bg-gray-700' : 'bg-gray-100'} flex justify-between items-center`}>
            <div className="flex items-center">
              <User className="mr-2" size={20} />
              <h3 className="font-semibold">Perfil de Usuario</h3>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className={`p-1 rounded-full hover:${modoOscuro ? 'bg-gray-600' : 'bg-gray-200'}`}
              >
                <X size={20} />
              </button>
            )}
          </div>
          <div className="p-4">
            {content}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Versión completa del perfil
  return (
    <div className={`${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
      <h2 className={`text-xl font-semibold ${modoOscuro ? 'text-white' : 'text-green-700'} mb-4 flex items-center`}>
        <User className="mr-2" />
        Perfil de Usuario
      </h2>
      {content}
    </div>
  );
};

export default PerfilUsuario;