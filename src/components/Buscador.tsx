import React from 'react';
import { Search } from 'lucide-react';

// Interfaz para las propiedades del componente Buscador
interface BuscadorProps {
  filtro: string;
  setFiltro: (filtro: string) => void;
  modoOscuro: boolean;
}

// Componente Buscador: Permite filtrar la lista de alimentos
const Buscador: React.FC<BuscadorProps> = ({ filtro, setFiltro, modoOscuro }) => {
  return (
    <div className="mb-4 relative">
      {/* Campo de búsqueda con icono */}
      <input
        type="text"
        placeholder="Buscar alimentos..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className={`w-full pl-10 pr-4 py-2 rounded-md ${
          modoOscuro
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'border-gray-300 text-gray-900 placeholder-gray-500'
        } focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {/* Icono de búsqueda */}
      <Search
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          modoOscuro ? 'text-gray-400' : 'text-gray-500'
        }`}
        size={20}
      />
    </div>
  );
};

export default Buscador;