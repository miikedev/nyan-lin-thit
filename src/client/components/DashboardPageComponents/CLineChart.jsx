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
import { getChartData } from '../../../utils/utils';
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
  },
};


export default function CLineChart({ width, height, fontSize, isFullWidth, dataResult, newDataResult }) {
  // Get labels and datasets from dataResult  
  const { labels, datasets } = getChartData(dataResult);  
  if(newDataResult === undefined) return ;
  console.log('newDataResult', newDataResult);

  const data = {
    labels: newDataResult.labels,
    datasets:newDataResult.datasets
  };

  return <Line options={options} data={data} width={width} height={height}/>;
}
