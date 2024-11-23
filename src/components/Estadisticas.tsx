import React from 'react';
import { BarChart, PieChart } from 'lucide-react';
import { Alimento } from '../types';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EstadisticasProps {
  alimentos: Alimento[];
  modoOscuro: boolean;
}

const Estadisticas: React.FC<EstadisticasProps> = ({ alimentos, modoOscuro }) => {
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

  const data = {
    labels: Object.keys(conteoCategoria),
    datasets: [
      {
        data: Object.values(conteoCategoria),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF'
        ]
      }
    ]
  };

  return (
    <div className={`${modoOscuro ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <h2 className={`text-xl font-semibold ${modoOscuro ? 'text-white' : 'text-green-700'} mb-4 flex items-center`}>
        <BarChart className="mr-2" />
        Estadísticas
      </h2>
      <div className="space-y-4">
        <div>
          <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}>Total de alimentos: {totalAlimentos}</p>
          <p className={`${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}>
            Caducan pronto: {alimentosPorCaducar}
          </p>
        </div>
        <div className="w-full h-64">
          <Chart type="pie" data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;