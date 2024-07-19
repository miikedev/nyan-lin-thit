import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
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
      position: 'top',
      labels: {
        boxWidth: 10, // Adjust the width as needed
        boxHeight: 10, // Adjust the height as needed
      },
    },
    
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart',
    // },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'AirStrike',
      data: [100, 200, 10, 300, 250, 400, 350],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      radius:5,
    },
    {
      label: 'Armed_Clashes',
      data: [50, 150, 300, 200, 100, 250, 400],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      radius:5,
    },
    {
      label: 'Massacre',
      data: [250, 180, 320, 150, 280, 200, 350],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      radius:5,
    },
    {
      label: 'Casualty',
      data: [120, 300, 180, 280, 220, 350, 400],
      borderColor: 'rgb(201, 203, 207)',
      backgroundColor: 'rgba(201, 203, 207, 0.5)',
      radius:5,
    },
    {
      label: 'Arrest',
      data: [300, 150, 250, 200, 350, 280, 400],
      borderColor: 'rgb(153, 102, 255)',
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      radius:5,
    },
  ],
};

export default function CLineChart({ width, height, fontSize, isFullWidth  }) {
  return <Line options={options} data={data} width={width} height={height}/>;
}
