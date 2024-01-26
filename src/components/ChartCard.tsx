// DoughnutChartComponent.tsx

import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartComponent: React.FC = () => {
  // Data untuk chart doughnut
  const data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          // 'rgba(255, 206, 86, 0.6)',
          // 'rgba(75, 192, 192, 0.6)',
          // 'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  // Opsi konfigurasi untuk chart doughnut
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {}
  };

  return (
    
      <div className="w-96 h-72 max-w-lg mx-auto mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Doughnut Chart</h2>
        <Doughnut 
          data={data} 
          width={200}
          height={200}
          options={options} 
        />
      </div>
    
  );
};

export default DoughnutChartComponent;
