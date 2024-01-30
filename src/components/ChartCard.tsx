// DoughnutChartComponent.tsx

import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartComponent: React.FC = () => {
  // Data for the doughnut chart
  const data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        data: [20, 20],
        backgroundColor: ['#9498FF', '#1B24FF'],
      },
    ],
  };

  // Configuration options for the doughnut chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {},
  };

  return (
    <div className='h-[400px] w-[400px] flex'>
      <div className="w-96 h-96 max-w-lg mx-auto mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Doughnut Chart</h2>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChartComponent;
