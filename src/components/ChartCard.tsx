'use client';
import React, { useEffect, useRef } from 'react';
import { Doughnut } from "react-chartjs-2";

const ChartCard = () => {
  // Sample data for the Doughnut chart
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 40, 30], // Example data values
        backgroundColor: ['red', 'green', 'blue'], // Example background colors for each segment
      },
    ],
  };

  // You can customize the configuration options as needed
  const options = {
    // Add your chart configuration options here
    // For example, you can customize the title, tooltips, etc.
  };

  return (
    <div>
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
};

export default ChartCard;
