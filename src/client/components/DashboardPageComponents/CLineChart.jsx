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
      borderRadius: 3,
    },
  },
  borderWidth: 2,
  pointStyle: false,
};


export default function CLineChart({ width, height, fontSize, isFullWidth, newDataResult, labels }) {
  // Get labels and datasets from dataResult  
  console.log('clineChart dataResult: ', newDataResult);

  if(newDataResult === undefined) return <Error />;
  // const refinedLabel = shortenDateRange(labels);

  const data = {
    labels: labels,
    datasets:newDataResult
  };

  return <Line options={options} data={data} width={width} height={height}/>

}
