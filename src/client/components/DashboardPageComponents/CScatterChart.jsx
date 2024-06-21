import React from 'react';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    x: {
        ticks: {
        //   color: 'red', // Color for x-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.3)', // Color for x-axis line
        },
      },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.3)', // Color for y-axis line
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        boxWidth:10,
        boxHeight:10,
      },
    },
  },
};

// Replace this with your custom data
const customData1 = [
    { x: 12, y: 35 },
    { x: 28, y: 62 },
    { x: 47, y: 18 },
    { x: 71, y: 92 },
    { x: 89, y: 54 }
  ];
  
  const customData2 = [
    { x: 5, y: 45 },
    { x: 22, y: 75 },
    { x: 39, y: 25 },
    { x: 61, y: 88 },
    { x: 79, y: 62 }
  ];
  
  const customData3 = [
    { x: 8, y: 28 },
    { x: 31, y: 55 },
    { x: 52, y: 41 },
    { x: 68, y: 77 },
    { x: 94, y: 63 }
  ];
  
  const customData4 = [
    { x: 16, y: 49 },
    { x: 24, y: 71 },
    { x: 43, y: 32 },
    { x: 59, y: 86 },
    { x: 83, y: 45 }
  ];
  
  const customData5 = [
    { x: 11, y: 22 },
    { x: 36, y: 66 },
    { x: 57, y: 39 },
    { x: 74, y: 81 },
    { x: 92, y: 57 }
  ];
  

  export const data = {
    datasets: [
      {
        label: 'AirStrike',
        data: customData1,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointStyle: 'circle',
         radius: 6,
       
      },
      {
        label: 'Armed_Clashes',
        data: customData2,
        backgroundColor: 'rgba(54, 162, 235, 1)',
        pointStyle: 'circle',
         radius: 6,
      },
      {
        label: 'Massacre',
        data: customData3,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        pointStyle: 'circle',
         radius: 6,
      },
      {
        label: 'Casualty',
        data: customData4,
        backgroundColor: 'rgba(153, 102, 255, 1)',
        pointStyle: 'circle',
         radius: 6,
      },
      {
        label: 'Arrest',
        data: customData5,
        backgroundColor: 'rgba(255, 159, 64, 1)',
        pointStyle: 'circle',
         radius: 6,
      },
    ],
  };
  

export default function CScatterChart({width,height}) {
  return <Scatter options={options} data={data} width={width} height={height} />;
}