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
    },
  },
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
