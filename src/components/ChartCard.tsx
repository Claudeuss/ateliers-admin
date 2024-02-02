import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Add this line

interface DoughnutChartProps {
  data: number[];
  labels: string[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className=' max-h-[300px] max-w-[400px] bg-white rounded-md p-2 '>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default DoughnutChart;
