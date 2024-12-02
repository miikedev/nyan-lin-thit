import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

import Error from '../../pages/Error';

ChartJS.register( 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const caseColors = {
  'airstrike': { backgroundColor: '#165BAA75', borderColor: 'rgb(255, 99, 132)' },
  'armed_clashes': { backgroundColor: '#FFA4B675', borderColor: 'rgb(54, 162, 235)' },
  'massacre': { backgroundColor: '#A155B975', borderColor: 'rgb(255, 206, 86)' },
  'casualties': { backgroundColor: '#57759075', borderColor: 'rgb(75, 192, 192)' },
  'arrests': { backgroundColor: '#F765A375', borderColor: 'rgb(153, 102, 255)' },
};
export const options = {
  responsive: true,

  scales: {
    x: {
        stacked: false,
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
        boxWidth: 3, // Adjust the width as needed
        boxHeight: 3, // Adjust the height as needed
      },
      borderRadius: 0,
    },
    title: {
      display: true,
      text: 'Aerial Attacks carried out by the Military Council (2021-2023) '
    }
  },
  borderWidth: 1.5,
};
const generateRandomArray = (length, min, max) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};
const data_sets = [
  {
    label: '2021',
    data: generateRandomArray(12, 50, 5000),
    backgroundColor: 'rgb(0,0,200)',
    borderColor: 'rgb(100,200,100)'
  },
  {
    label: '2022',
    data: generateRandomArray(12, 50, 5000),
    backgroundColor: 'rgb(0,0,200)',
    borderColor: 'rgb(200,200,100)'

  },
  {
    label: '2023',
    data: generateRandomArray(12, 50, 5000),
    backgroundColor: 'rgb(0,0,200)',
    borderColor: 'rgb(200,100,100)'
  },
  {
    label: '2024',
    data: generateRandomArray(12, 50, 5000),
    backgroundColor: 'rgb(0,0,200)',
    borderColor: 'rgb(100,100,200)'
  }
]
export default function CLineChart({ width, height, fontSize, isFullWidth, newDataResult, labels }) {

  if(newDataResult === undefined) return <Error />;
  // const refinedLabel = shortenDateRange(labels);


  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"],
    datasets: data_sets
  };

  return <Line options={options} data={data} width={width} height={height}/>

}
