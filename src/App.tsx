import React, { useState } from 'react';
import { Plus, RefreshCw, Moon, Sun, Leaf, Bell, User, ListPlus, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import ListaAlimentos from './components/ListaAlimentos';
import FormularioAlimento from './components/FormularioAlimento';
import ConsejosDesperdicio from './components/ConsejosDesperdicio';
import EstadisticasAvanzadas from './components/EstadisticasAvanzadas';
import Notificaciones from './components/Notificaciones';
import Buscador from './components/Buscador';
import PerfilUsuario from './components/PerfilUsuario';
import SugerenciasRecetas from './components/SugerenciasRecetas';
import Login from './components/Login';
import { Alimento, Usuario } from './types';
import { recetas } from './data/recetas';

const App: React.FC = () => {
  // Estados principales de la aplicación
  const [modoOscuro, setModoOscuro] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [alimentoEditar, setAlimentoEditar] = useState<Alimento | undefined>(undefined);
  const [filtro, setFiltro] = useState('');
  const [modalAbierto, setModalAbierto] = useState<'notificaciones' | 'perfil' | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [hayNotificacionesNuevas, setHayNotificacionesNuevas] = useState(false);
  const [notificacionesLeidas, setNotificacionesLeidas] = useState<Set<number>>(new Set());
  const [notificacionesEliminadas, setNotificacionesEliminadas] = useState<Set<number>>(new Set());

  // Función para determinar la categoría de un ingrediente basado en su nombre
  const determinarCategoria = (ingrediente: string): string => {
    const ingredienteLower = ingrediente.toLowerCase();
    
    const categorias = {
      Frutas: ['manzana', 'plátano', 'naranja', 'limón', 'fresa', 'piña', 'uva', 'kiwi', 'melón', 'sandía'],
      Verduras: ['berenjena', 'calabacín', 'espinacas', 'brócoli', 'zanahoria', 'cebolla', 'ajo', 'tomate', 'pimiento', 'bambú', 'pak choi', 'cebolla verde', 'champiñones', 'lechuga'],
      Lácteos: ['leche', 'queso', 'yogur', 'nata', 'mantequilla', 'crema', 'ricotta', 'mozzarella', 'parmesano', 'pecorino', 'queso cheddar'],
      Carnes: ['pollo', 'tempeh', 'tofu', 'jamón', 'panceta', 'carne picada', 'carne picada mixta'],
      Pescados: ['salmón', 'atún'],
      Cereales: ['arroz', 'pasta', 'quinoa', 'fideos', 'arroz basmati', 'arroz jazmín', 'espaguetis', 'macarrones', 'harina', 'pan rallado', 'pan de hamburguesa'],
      Legumbres: ['garbanzos', 'lentejas'],
      Especias: ['curry', 'miso', 'jengibre', 'cilantro', 'albahaca', 'romero', 'eneldo', 'pimienta', 'nuez moscada'],
      Salsas: ['salsa de soja', 'salsa de pescado', 'pasta de curry', 'pesto', 'salsa de tomate', 'mayonesa'],
      'Frutos Secos': ['cacahuetes', 'piñones', 'sésamo'],
      Otros: ['leche de coco', 'leche de almendras', 'levadura nutricional', 'setas', 'setas shiitake', 'huevo', 'aceite', 'aceite de oliva', 'vinagre', 'lima', 'limón', 'levadura', 'aceitunas', 'vino blanco']
    };

    for (const [categoria, ingredientes] of Object.entries(categorias)) {
      if (ingredientes.some(item => ingredienteLower.includes(item))) {
        return categoria;
      }
    }

    return 'Otros';
  };

  // Manejadores de eventos principales

  // Gestión del inicio de sesión y cierre de sesión
  const handleLogin = () => {
    setUsuario({
      nombre: "Usuario Demo",
      email: "usuario@demo.com"
    });
  };

  const handleLogout = () => {
    // Reiniciar todos los estados al cerrar sesión
    setUsuario(null);
    setAlimentos([]);
    setFiltro('');
    setModalAbierto(null);
    setMostrarFormulario(false);
    setAlimentoEditar(undefined);
    setHayNotificacionesNuevas(false);
    setNotificacionesLeidas(new Set());
    setNotificacionesEliminadas(new Set());
  };

  // Gestión de alimentos
  const handleSubmit = (nuevoAlimento: Omit<Alimento, 'id'>) => {
    if (alimentoEditar) {
      // Actualizar alimento existente
      setAlimentos(prevAlimentos => 
        prevAlimentos.map(alimento => 
          alimento.id === alimentoEditar.id 
            ? { ...nuevoAlimento, id: alimentoEditar.id }
            : alimento
        )
      );
      setAlimentoEditar(undefined);
    } else {
      // Añadir nuevo alimento
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setAlimentos(prevAlimentos => [...prevAlimentos, { ...nuevoAlimento, id }]);
      setHayNotificacionesNuevas(true);
      setNotificacionesLeidas(new Set());
    }
    setMostrarFormulario(false);
  };

  // Funciones para gestionar la lista de alimentos
  const handleEliminar = (idEliminar: number) => {
    setAlimentos(prevAlimentos => prevAlimentos.filter(alimento => alimento.id !== idEliminar));
  };

  const handleEliminarTodos = () => {
    setAlimentos([]);
    setHayNotificacionesNuevas(false);
    setNotificacionesLeidas(new Set());
    setNotificacionesEliminadas(new Set());
  };

  const handleEditar = (id: number) => {
    const alimento = alimentos.find(a => a.id === id);
    if (alimento) {
      setAlimentoEditar(alimento);
      setMostrarFormulario(true);
    }
  };

  // Función para añadir todos los ingredientes de las recetas como alimentos
  const handleAddAllIngredients = () => {
    const uniqueIngredients = new Set<string>();
    recetas.forEach(receta => {
      receta.ingredientes.forEach(ingrediente => {
        uniqueIngredients.add(ingrediente);
      });
    });

    // Crear un alimento caducado para demostración
    const fechaCaducada = new Date();
    fechaCaducada.setDate(fechaCaducada.getDate() - 1);
    const alimentoCaducado = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      nombre: "Yogur",
      fechaCaducidad: fechaCaducada.toISOString().split('T')[0],
      cantidad: Math.floor(Math.random() * 9) + 1,
      categoria: "Lácteos"
    };

    // Crear nuevos alimentos a partir de los ingredientes únicos
    const newIngredients = Array.from(uniqueIngredients)
      .filter(ingrediente => !alimentos.some(a => a.nombre.toLowerCase() === ingrediente.toLowerCase()))
      .map((ingrediente, index) => {
        const fechaCaducidad = new Date();
        fechaCaducidad.setDate(fechaCaducidad.getDate() + index + 1);

        return {
          id: Date.now() + Math.floor(Math.random() * 1000) + index,
          nombre: ingrediente,
          fechaCaducidad: fechaCaducidad.toISOString().split('T')[0],
          cantidad: Math.floor(Math.random() * 9) + 1,
          categoria: determinarCategoria(ingrediente)
        };
      });

    newIngredients.unshift(alimentoCaducado);

    if (newIngredients.length > 0) {
      setAlimentos(prevAlimentos => [...prevAlimentos, ...newIngredients]);
      setHayNotificacionesNuevas(true);
      setNotificacionesLeidas(new Set());
    }
  };

  // Gestión de modales y notificaciones
  const toggleModal = (modal: 'notificaciones' | 'perfil') => {
    if (modal === 'notificaciones' && modalAbierto !== 'notificaciones') {
      setHayNotificacionesNuevas(false);
    }
    setModalAbierto(modalAbierto === modal ? null : modal);
  };

  const handleLimpiarNotificaciones = () => {
    const nuevasNotificacionesEliminadas = new Set(notificacionesEliminadas);
    alimentos.forEach(alimento => {
      nuevasNotificacionesEliminadas.add(alimento.id);
    });
    setNotificacionesEliminadas(nuevasNotificacionesEliminadas);
    setHayNotificacionesNuevas(false);
  };

  // Si no hay usuario, mostrar pantalla de login
  if (!usuario) {
    return <Login onLogin={handleLogin} modoOscuro={modoOscuro} />;
  }

  return (
    <div className={`min-h-screen ${modoOscuro ? 'bg-gray-900 text-white' : 'bg-green-50'}`}>
      {/* Cabecera de la aplicación */}
      <header className={`sticky top-0 z-50 ${modoOscuro ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Leaf className="text-green-500 mr-2" size={24} />
              <h1 className={`text-2xl font-bold ${modoOscuro ? 'text-white' : 'text-green-700'}`}>
                FoodSaver
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => toggleModal('notificaciones')}
                  className={`p-2 rounded-full ${
                    modoOscuro ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  } transition duration-300`}
                >
                  <Bell size={20} />
                  {hayNotificacionesNuevas && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleModal('perfil')}
                  className={`p-2 rounded-full ${
                    modoOscuro ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  } transition duration-300`}
                >
                  <User size={20} />
                </button>
              </div>
              <button
                onClick={() => setModoOscuro(!modoOscuro)}
                className={`p-2 rounded-full ${
                  modoOscuro ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition duration-300`}
              >
                {modoOscuro ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modales de notificaciones */}
      {modalAbierto === 'notificaciones' && (
        <div className="fixed top-16 right-4 z-50">
          <Notificaciones
            alimentos={alimentos}
            modoOscuro={modoOscuro}
            onClose={() => setModalAbierto(null)}
            notificacionesLeidas={notificacionesLeidas}
            notificacionesEliminadas={notificacionesEliminadas}
            onLimpiarNotificaciones={handleLimpiarNotificaciones}
          />
        </div>
      )}

      {modalAbierto === 'perfil' && (
        <div className="fixed top-16 right-4 z-50">
          <PerfilUsuario
            usuario={usuario}
            modoOscuro={modoOscuro}
            onClose={() => setModalAbierto(null)}
            onLogout={handleLogout}
            compact
          />
        </div>
      )}
      
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Sección de gestión de alimentos */}
        <div className={`${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-semibold ${modoOscuro ? 'text-white' : 'text-green-700'}`}>
              Mis Alimentos
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleEliminarTodos}
                className={`${
                  modoOscuro ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                } text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300`}
                aria-label="Eliminar Todos"
              >
                <Trash className="mr-2" />
                Eliminar Todos
              </button>
              <button
                onClick={handleAddAllIngredients}
                className={`${
                  modoOscuro ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300`}
                aria-label="Añadir Todos"
              >
                <ListPlus className="mr-2" />
                Añadir Todos
              </button>
              <button
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                className={`${
                  modoOscuro ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                } text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300`}
                aria-label={mostrarFormulario ? "Cancelar" : "Añadir Alimento"}
              >
                {mostrarFormulario ? <RefreshCw className="mr-2" /> : <Plus className="mr-2" />}
                {mostrarFormulario ? 'Cancelar' : 'Añadir Alimento'}
              </button>
            </div>
          </div>
          
          {/* Buscador de alimentos */}
          <Buscador
            filtro={filtro}
            setFiltro={setFiltro}
            modoOscuro={modoOscuro}
          />

          {/* Formulario para añadir/editar alimentos */}
          {mostrarFormulario && (
            <FormularioAlimento
              onSubmit={handleSubmit}
              modoOscuro={modoOscuro}
              alimentoEditar={alimentoEditar}
              onCancelarEdicion={() => {
                setAlimentoEditar(undefined);
                setMostrarFormulario(false);
              }}
            />
          )}

          {/* Lista de alimentos */}
          <ListaAlimentos
            alimentos={alimentos.filter(alimento =>
              alimento.nombre.toLowerCase().includes(filtro.toLowerCase())
            )}
            onEliminar={handleEliminar}
            onEditar={handleEditar}
            modoOscuro={modoOscuro}
          />
        </div>
        
        {/* Componentes adicionales */}
        <EstadisticasAvanzadas alimentos={alimentos} modoOscuro={modoOscuro} />
        <SugerenciasRecetas alimentos={alimentos} modoOscuro={modoOscuro} />
        <ConsejosDesperdicio modoOscuro={modoOscuro} alimentos={alimentos} />
      </main>
    </div>
  );
};

export default App;