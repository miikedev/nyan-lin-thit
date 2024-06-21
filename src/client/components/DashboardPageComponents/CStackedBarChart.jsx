import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    scales: {
        x: {
            ticks: {
            //   color: 'red', // Color for x-axis labels
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.3)', // Color for x-axis line
            },
            stacked: true,
          },
        y: {
         
          grid: {
            color: 'rgba(255, 255, 255, 0.3)', // Color for y-axis line
          },
          stacked: true,
        },
      },
  plugins: {
    // title: {
    //   display: true,
    //   text: 'Chart.js Bar Chart - Stacked',
    // },
    legend: {
        position: 'top',
        labels: {
          boxWidth: 10, // Adjust the width as needed
          boxHeight: 10, // Adjust the height as needed
        },
      },
  },
  responsive: true,
 
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const dataset1Data = [120, 180, 240, 300, 360, 420, 480];
const dataset2Data = [80, 120, 160, 200, 240, 280, 320];
const dataset3Data = [60, 90, 120, 150, 180, 210, 240];
const dataset4Data = [40, 60, 80, 100, 120, 140, 160];
const dataset5Data = [20, 30, 40, 50, 60, 70, 80];


export const data = {
    labels,
    datasets: [
      {
        label: 'AirStrike',
        data: dataset1Data,
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Armed_Clashes',
        data: dataset2Data,
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Massacre',
        data: dataset3Data,
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Casualty',
        data: dataset4Data,
        backgroundColor: 'rgb(201, 203, 207)',
      },
      {
        label: 'Arrest',
        data: dataset5Data,
        backgroundColor: 'rgb(255, 159, 64)',
      },
    ],
  };
export default function CStackedBarChart({width,height}) {
  return <Bar options={options} data={data} width={width} height={height}/>;
}