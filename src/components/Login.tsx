import React from 'react';
import { User, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

// Interfaz para las propiedades del componente Login
interface LoginProps {
  onLogin: () => void;
  modoOscuro: boolean;
}

// Componente Login: Pantalla de inicio de sesión
const Login: React.FC<LoginProps> = ({ onLogin, modoOscuro }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Contenedor principal con animación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${
          modoOscuro ? 'bg-gray-800' : 'bg-white'
        } p-8 rounded-lg shadow-lg max-w-md w-full`}
      >
        {/* Icono de usuario */}
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full ${
            modoOscuro ? 'bg-gray-700' : 'bg-green-100'
          }`}>
            <User size={32} className={modoOscuro ? 'text-white' : 'text-green-600'} />
          </div>
        </div>

        {/* Título y descripción */}
        <h2 className={`text-2xl font-bold text-center mb-6 ${
          modoOscuro ? 'text-white' : 'text-gray-900'
        }`}>
          Bienvenido a FoodSaver
        </h2>
        <p className={`text-center mb-8 ${
          modoOscuro ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Inicia sesión para gestionar tus alimentos y reducir el desperdicio
        </p>

        {/* Botón de inicio de sesión */}
        <button
          onClick={onLogin}
          className={`w-full ${
            modoOscuro
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-green-500 hover:bg-green-600'
          } text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300`}
        >
          <LogIn className="mr-2" />
          Iniciar sesión con cuenta demo
        </button>
      </motion.div>
    </div>
  );
};

export default Login;