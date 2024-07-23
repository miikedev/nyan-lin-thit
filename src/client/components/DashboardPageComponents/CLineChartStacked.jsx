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


const labels = [  
    "Ayeyarwady",  
    "Bago",  
    "Magway",  
    "Mandalay",  
    "Sagaing",  
    "Tanintharyi",  
    "Yangon",  
    "Chin",  
    "Kachin",  
    "Kayah",  
    "Kayin",  
    "Mon",  
    "Rakhine",  
    "Shan"  
];  

export const data = {
  labels,
  datasets: [
    {
        fill: true,
        data: [628, 745, 341, 526, 159, 131, 266, 472, 823, 826, 684, 891, 174, 661],
        label: 'Airstrike',  
        borderColor: 'rgb(255, 99, 132)',  
        backgroundColor: 'rgba(255, 99, 132, 0.5)', 
    },
    {
        fill: true,
        data: [619, 182, 870, 238, 416, 681, 34, 32, 586, 511, 289, 305, 141, 542],
        label: 'Armed Clashes',  
        borderColor: 'rgb(53, 162, 235)',  
        backgroundColor: 'rgba(53, 162, 235, 0.5)', 
    },
    {
        fill: true,
        data:[923, 251, 414, 349, 37, 354, 940, 777, 636, 986, 906, 868, 702, 719],
        label: 'Massacre',  
        borderColor: 'rgb(75, 192, 192)',  
        backgroundColor: 'rgba(75, 192, 192, 0.5)', 
    },
    {
        fill: true,
        data: [264, 758, 329, 751, 171, 972, 320, 426, 344, 306, 313, 402, 720, 486],
        label: 'Casualty',  
        borderColor: 'rgb(201, 203, 207)',  
        backgroundColor: 'rgba(201, 203, 207, 0.5)', 
    },
    {
        fill: true,
        data: [723, 873, 455, 534, 885, 816, 502, 848, 603, 159, 355, 112, 732, 98],
        label: 'Arrests',  
        borderColor: 'rgb(153, 102, 255)',  
        backgroundColor: 'rgba(153, 102, 255, 0.5)', 
    }
  ],
};

const CLineChartStacked = (width, height, dataResult) => {
    // const { labels, datasets } = getChartData(dataResult);  

    // const data = {
    //     labels,
    //     datasets: datasets
    // };

    return <Line options={options} data={data} width={width} height={height} />;
}

export default CLineChartStacked;
