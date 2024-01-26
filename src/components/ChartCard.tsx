import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      label: '# of Votes',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Set to false to allow custom height
  height: 200, // Set the desired height in pixels
  legend: {
    position: 'bottom',
  },
  rotation: 0 // Rotate the labels
};

const ChartCard = () => {
  return (
    <div className='w-48 h-48'>
      <Doughnut data={data} options={options}/>
    </div>
  )
}

export default ChartCard;
