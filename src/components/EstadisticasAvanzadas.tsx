import React, { useState } from 'react';
import { BarChart, Euro, Trash2, PieChart } from 'lucide-react';
import { Alimento } from '../types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface EstadisticasAvanzadasProps {
  alimentos: Alimento[];
  modoOscuro: boolean;
}

const categoryColors: Record<string, string> = {
  'Frutas': '#FF6384',
  'Verduras': '#36A2EB',
  'Lácteos': '#FFCE56',
  'Carnes': '#4BC0C0',
  'Pescados': '#9966FF',
  'Cereales': '#FF9F40',
  'Legumbres': '#FF6384',
  'Especias': '#C9CBCF',
  'Frutos Secos': '#FF8A80',
  'Salsas': '#82B1FF',
  'Otros': '#A1887F'
};

const preciosPorCategoria: Record<string, number> = {
  'Frutas': 2.50,
  'Verduras': 2.20,
  'Lácteos': 1.80,
  'Carnes': 8.50,
  'Pescados': 12.00,
  'Cereales': 2.30,
  'Legumbres': 2.80,
  'Congelados': 4.50,
  'Bebidas': 1.20,
  'Snacks': 8.00,
  'Otros': 3.50
};

const EstadisticasAvanzadas: React.FC<EstadisticasAvanzadasProps> = ({ alimentos, modoOscuro }) => {
  const [tipoGrafico, setTipoGrafico] = useState<'pie' | 'bar'>('pie');
  const fechaActual = new Date();
  const totalAlimentos = alimentos.length;
  const alimentosPorCaducar = alimentos.filter(
    (alimento) => new Date(alimento.fechaCaducidad) > fechaActual && 
                  new Date(alimento.fechaCaducidad) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  ).length;

  const conteoCategoria = alimentos.reduce((acc, alimento) => {
    acc[alimento.categoria] = (acc[alimento.categoria] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Agrupar alimentos por fecha de caducidad y categoría
  const alimentosPorFecha = alimentos.reduce((acc, alimento) => {
    const fecha = new Date(alimento.fechaCaducidad).toISOString().split('T')[0];
    if (!acc[fecha]) {
      acc[fecha] = {
        total: 0,
        porCategoria: {} as Record<string, number>,
        nombres: [] as string[]
      };
    }
    acc[fecha].total += alimento.cantidad;
    acc[fecha].porCategoria[alimento.categoria] = (acc[fecha].porCategoria[alimento.categoria] || 0) + alimento.cantidad;
    acc[fecha].nombres.push(`${alimento.nombre} (${alimento.cantidad})`);
    return acc;
  }, {} as Record<string, { total: number; porCategoria: Record<string, number>; nombres: string[] }>);

  const fechasOrdenadas = Object.keys(alimentosPorFecha).sort();
  const categorias = [...new Set(alimentos.map(a => a.categoria))];

  const pieData = {
    labels: Object.keys(conteoCategoria),
    datasets: [
      {
        data: Object.values(conteoCategoria),
        backgroundColor: Object.keys(conteoCategoria).map(cat => categoryColors[cat] || '#A1887F'),
        hoverBackgroundColor: Object.keys(conteoCategoria).map(cat => `${categoryColors[cat]}CC` || '#A1887FCC'),
        borderWidth: 2,
        borderColor: modoOscuro ? '#1f2937' : '#ffffff'
      }
    ]
  };

  const barData = {
    labels: fechasOrdenadas,
    datasets: categorias.map(categoria => ({
      label: categoria,
      data: fechasOrdenadas.map(fecha => alimentosPorFecha[fecha].porCategoria[categoria] || 0),
      backgroundColor: `${categoryColors[categoria]}CC` || '#A1887FCC',
      borderColor: categoryColors[categoria] || '#A1887F',
      borderWidth: 1,
      stack: 'stack',
      hoverBackgroundColor: categoryColors[categoria] || '#A1887F'
    }))
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: modoOscuro ? 'white' : 'black',
          padding: 20,
          font: {
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: modoOscuro ? '#374151' : 'white',
        titleColor: modoOscuro ? 'white' : 'black',
        bodyColor: modoOscuro ? 'white' : 'black',
        borderColor: modoOscuro ? '#4B5563' : '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          afterBody: (context: any) => {
            if (tipoGrafico === 'bar') {
              const fecha = context[0].label;
              return ['Alimentos:', ...alimentosPorFecha[fecha].nombres];
            }
            return undefined;
          }
        }
      },
      title: {
        display: true,
        text: tipoGrafico === 'pie' ? 'Distribución por Categorías' : 'Alimentos por Fecha de Caducidad',
        color: modoOscuro ? 'white' : 'black',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      }
    },
    ...(tipoGrafico === 'bar' && {
      scales: {
        x: {
          stacked: true,
          grid: {
            color: modoOscuro ? '#374151' : '#E5E7EB'
          },
          ticks: {
            color: modoOscuro ? 'white' : 'black'
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: {
            color: modoOscuro ? '#374151' : '#E5E7EB'
          },
          ticks: {
            stepSize: 1,
            precision: 0,
            color: modoOscuro ? 'white' : 'black'
          }
        }
      }
    })
  };

  const ahorroEstimado = alimentos.reduce((total, alimento) => {
    const precioUnitario = preciosPorCategoria[alimento.categoria] || preciosPorCategoria['Otros'];
    return total + (precioUnitario * alimento.cantidad);
  }, 0);

  const desperdicioEvitado = alimentos.reduce((total, alimento) => {
    return total + alimento.cantidad;
  }, 0);

  return (
    <div className={`${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-semibold ${modoOscuro ? 'text-white' : 'text-green-700'} flex items-center`}>
          <BarChart className="mr-2" />
          Estadísticas Avanzadas
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTipoGrafico('pie')}
            className={`p-2 rounded-lg transition-colors ${
              tipoGrafico === 'pie'
                ? modoOscuro
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white'
                : modoOscuro
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <PieChart size={20} />
          </button>
          <button
            onClick={() => setTipoGrafico('bar')}
            className={`p-2 rounded-lg transition-colors ${
              tipoGrafico === 'bar'
                ? modoOscuro
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white'
                : modoOscuro
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <BarChart size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="w-full h-[400px]">
            {tipoGrafico === 'pie' ? (
              <Pie data={pieData} options={chartOptions} />
            ) : (
              <Bar data={barData} options={chartOptions} />
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div className={`p-4 rounded-lg ${modoOscuro ? 'bg-gray-700' : 'bg-green-50'}`}>
            <h3 className={`text-lg font-semibold ${modoOscuro ? 'text-white' : 'text-green-600'} mb-2`}>
              Resumen
            </h3>
            <div className="space-y-2">
              <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                Total de alimentos: <span className="font-bold">{totalAlimentos}</span>
              </p>
              <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                Caducan en 3 días: <span className="font-bold text-yellow-500">{alimentosPorCaducar}</span>
              </p>
              <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}>
                Categorías: <span className="font-bold">{Object.keys(conteoCategoria).length}</span>
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${modoOscuro ? 'bg-gray-700' : 'bg-green-50'}`}>
            <h3 className={`text-lg font-semibold ${modoOscuro ? 'text-white' : 'text-green-600'} mb-2 flex items-center`}>
              <Euro className="mr-2" size={20} />
              Ahorro Estimado
            </h3>
            <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'} text-xl`}>
              <span className="font-bold text-green-500">{ahorroEstimado.toFixed(2)} €</span>
            </p>
          </div>

          <div className={`p-4 rounded-lg ${modoOscuro ? 'bg-gray-700' : 'bg-green-50'}`}>
            <h3 className={`text-lg font-semibold ${modoOscuro ? 'text-white' : 'text-green-600'} mb-2 flex items-center`}>
              <Trash2 className="mr-2" size={20} />
              Desperdicio Evitado
            </h3>
            <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'} text-xl`}>
              <span className="font-bold text-green-500">{desperdicioEvitado.toFixed(2)} kg</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasAvanzadas;