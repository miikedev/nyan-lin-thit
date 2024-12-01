import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import _, { update } from 'lodash';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const options = {
  indexAxis: 'x',
    scales: {
        x: {
            ticks: {
              color: '#2f2f2f', // Color for x-axis labels
            },
            grid: {
              color: 'rgba(255, 255, 255, .3)', // Color for x-axis line
            },
            stacked: true,
          },
        y: {
         
          grid: {
            color: 'rgba(255, 255, 255, .3)', // Color for y-axis line
          },
          stacked: true,
        },
      },
  plugins: {
    // title: {
    //   display: true,
    //   text: 'Chart.js Bar Chart - Stacked',
    // },
    label: {
      width: 50
    },
    legend: {
        position: 'top',
        labels: {
          boxWidth: 5, // Adjust the width as needed
          boxHeight: 5, // Adjust the height as needed
        },
      },
  },
  responsive: true,
 
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const dataset1Data = [120, 180, 240, 300, 360, 420, 480];
// const dataset2Data = [80, 120, 160, 200, 240, 280, 320];
// const dataset3Data = [60, 90, 120, 150, 180, 210, 240];
// const dataset4Data = [40, 60, 80, 100, 120, 140, 160];
// const dataset5Data = [20, 30, 40, 50, 60, 70, 80];


export default function CStackedBarChart({width,height,datasets,labels}) {
  if(datasets === undefined) return ;
  // const newLabels = [
  //   'injury',
  //   'death'
  // ];
  
  // Assuming `dataset` is your original data array
  // const updatedDataset = datasets.slice(0, 3).map((item, index) => {
  //   // Clone the original item and replace the label with the new label
  //   return {
  //     ...item
  //   };
  // });
  
  
  const data = {
    labels: [
      ['Military', 'Personnel', 'Casualties'],
      ['Armed', 'Revolutionary', 'Casualties'],
      ['Military', 'Personnel', 'Casualties'],
    ],
    datasets: [
      {
        label: 'injury',
        data: [260, 590, 1120],
        backgroundColor: '#2D9CDB' ,
        stack: 'injure',
      },
      {
        label: 'death',
        data: [120, 180, 140] ,
        backgroundColor: '#F9C74F',
        stack: 'death',
      },
    ],
  };
  return <Bar options={options} data={data} width={width} height={height}/>;
}