import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, Scan, X, Camera } from 'lucide-react';
import { Alimento } from '../types';
import { recetas } from '../data/recetas';

interface FormularioAlimentoProps {
  onSubmit: (alimento: Omit<Alimento, 'id'>) => void;
  modoOscuro: boolean;
  alimentoEditar?: Alimento;
  onCancelarEdicion?: () => void;
}

const categorias = [
  'Frutas', 'Verduras', 'Lácteos', 'Carnes', 'Pescados',
  'Cereales', 'Legumbres', 'Especias', 'Otros'
];

// Mapeo de ingredientes a categorías
const categoriasIngredientes: Record<string, string[]> = {
  Frutas: ['manzana', 'plátano', 'naranja', 'limón', 'fresa', 'piña', 'uva', 'kiwi', 'melón', 'sandía', 'pera', 'melocotón', 'albaricoque', 'ciruela', 'cereza', 'higo', 'granada'],
  Verduras: ['berenjena', 'calabacín', 'espinaca', 'brócoli', 'zanahoria', 'cebolla', 'ajo', 'tomate', 'pimiento', 'bambú', 'pak choi', 'cebolla verde', 'champiñón', 'lechuga', 'pepino', 'apio', 'remolacha', 'coliflor', 'col', 'espárrago'],
  Lácteos: ['leche', 'queso', 'yogur', 'nata', 'mantequilla', 'crema', 'ricotta', 'mozzarella', 'parmesano', 'pecorino', 'queso cheddar', 'requesón', 'kéfir', 'mascarpone'],
  Carnes: ['pollo', 'tempeh', 'tofu', 'jamón', 'panceta', 'carne picada', 'ternera', 'cerdo', 'cordero', 'pavo', 'conejo', 'salchicha', 'chorizo', 'bacon'],
  Pescados: ['salmón', 'atún', 'merluza', 'bacalao', 'dorada', 'lubina', 'rape', 'sardina', 'boquerón', 'caballa', 'trucha'],
  Cereales: ['arroz', 'pasta', 'quinoa', 'fideos', 'arroz basmati', 'arroz jazmín', 'espagueti', 'macarrón', 'harina', 'pan rallado', 'pan', 'avena', 'cebada', 'centeno', 'trigo'],
  Legumbres: ['garbanzo', 'lenteja', 'judía', 'soja', 'guisante', 'haba', 'alubia', 'frijol'],
  Especias: ['curry', 'miso', 'jengibre', 'cilantro', 'albahaca', 'romero', 'eneldo', 'pimienta', 'nuez moscada', 'comino', 'cúrcuma', 'orégano', 'tomillo', 'perejil'],
  'Frutos Secos': ['cacahuete', 'piñón', 'sésamo', 'almendra', 'nuez', 'avellana', 'anacardo', 'pistache']
};

// Función para determinar la categoría de un alimento
const determinarCategoria = (nombre: string): string => {
  const nombreLower = nombre.toLowerCase();
  
  for (const [categoria, ingredientes] of Object.entries(categoriasIngredientes)) {
    if (ingredientes.some(ingrediente => 
      nombreLower.includes(ingrediente) || 
      ingrediente.includes(nombreLower)
    )) {
      return categoria;
    }
  }
  
  return 'Otros';
};

const ingredientesUnicos = Array.from(new Set(
  recetas.flatMap(receta => receta.ingredientes.map(i => i.toLowerCase()))
));

const FormularioAlimento: React.FC<FormularioAlimentoProps> = ({ 
  onSubmit, 
  modoOscuro, 
  alimentoEditar, 
  onCancelarEdicion 
}) => {
  const [nombre, setNombre] = useState(alimentoEditar?.nombre || '');
  const [fechaCaducidad, setFechaCaducidad] = useState(alimentoEditar?.fechaCaducidad || new Date().toISOString().split('T')[0]);
  const [cantidad, setCantidad] = useState(alimentoEditar?.cantidad || 1);
  const [categoria, setCategoria] = useState(alimentoEditar?.categoria || '');
  const [mostrarEscaneo, setMostrarEscaneo] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (alimentoEditar) {
      setNombre(alimentoEditar.nombre);
      setFechaCaducidad(alimentoEditar.fechaCaducidad);
      setCantidad(alimentoEditar.cantidad);
      setCategoria(alimentoEditar.categoria);
    }
  }, [alimentoEditar]);

  // Actualizar categoría cuando cambia el nombre
  useEffect(() => {
    if (nombre && !alimentoEditar) {
      const categoriaDetectada = determinarCategoria(nombre);
      setCategoria(categoriaDetectada);
    }
  }, [nombre, alimentoEditar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && fechaCaducidad && categoria) {
      onSubmit({ nombre, fechaCaducidad, cantidad, categoria });
      if (!alimentoEditar) {
        setNombre('');
        setFechaCaducidad(new Date().toISOString().split('T')[0]);
        setCantidad(1);
        setCategoria('');
      }
    }
  };

  const handleScan = () => {
    setMostrarEscaneo(true);
    setTimeout(() => {
      const ingredienteAleatorio = ingredientesUnicos[Math.floor(Math.random() * ingredientesUnicos.length)];
      const categoriaDetectada = determinarCategoria(ingredienteAleatorio);
      const fechaCaducidad = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      setNombre(ingredienteAleatorio);
      setFechaCaducidad(fechaCaducidad);
      setCantidad(1);
      setCategoria(categoriaDetectada);
      setMostrarEscaneo(false);
    }, 2000);
  };

  const inputClass = `mt-1 block w-full rounded-md ${
    modoOscuro
      ? 'bg-gray-700 border-gray-600 text-white'
      : 'border-gray-300 text-gray-900'
  } shadow-sm focus:border-green-500 focus:ring-green-500`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del alimento"
          required
          className={inputClass}
          list="ingredientes-sugeridos"
        />
        <datalist id="ingredientes-sugeridos">
          {ingredientesUnicos.map((ingrediente, index) => (
            <option key={index} value={ingrediente} />
          ))}
        </datalist>
        <button
          type="button"
          onClick={handleScan}
          className={`p-2 rounded-md ${
            modoOscuro ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <Scan size={20} />
        </button>
      </div>

      {mostrarEscaneo && (
        <div className="flex items-center justify-center space-x-2 text-green-500">
          <Camera size={20} />
          <span>Escaneando...</span>
        </div>
      )}

      <div>
        <input
          ref={dateInputRef}
          type="date"
          value={fechaCaducidad}
          onChange={(e) => setFechaCaducidad(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(Math.max(1, Math.min(99, Number(e.target.value))))}
          min="1"
          max="99"
          required
          className={inputClass}
        />
      </div>

      <div>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className={inputClass}
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className={`${
            modoOscuro ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300`}
        >
          <PlusCircle className="mr-2" />
          {alimentoEditar ? 'Actualizar Alimento' : 'Añadir Alimento'}
        </button>
        {alimentoEditar && onCancelarEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className={`${
              modoOscuro ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
            } text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300`}
          >
            <X className="mr-2" />
            Cancelar Edición
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioAlimento;