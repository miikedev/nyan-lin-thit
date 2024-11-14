import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import _ from 'lodash';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const options = {
    indexAxis: 'y',
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
  const newLabels = [
    'Military Personnel Casualties',
    'Armed Revolutionary Casualties',
    'Military Personnel Casualties',
  ];
  
  // Assuming `dataset` is your original data array
  const updatedDataset = datasets .slice(0, 3).map((item, index) => {
    // Clone the original item and replace the label with the new label
    return {
      ...item,
      label: newLabels[index],
    };
  });
  console.log('updated dataset', updatedDataset);
  
  const result_death = updatedDataset.map(d => {
    return { ...d, stack: 'death', label: d.label+': '+'death', backgroundColor: 'rgba(50, 50, 50, 0.6)'};  
  })
  
  const result_injury = _.sampleSize(updatedDataset,updatedDataset.length).map(d => {
     return { ...d, stack: 'injury', label: d.label+': '+'injury', backgroundColor: 'rgba(255, 20, 0, 0.7)'};  
  })
  const merge = [...result_death, ...result_injury]
  console.log('merge: ',merge);
  
  const data = {
    labels: [
      ['Military', 'Personnel', 'Casualties'],
      ['Armed', 'Revolutionary', 'Casualties'],
      ['Military', 'Personnel', 'Casualties'],
    ],
    datasets: merge
  };
  return <Bar options={options} data={data} width={width} height={height}/>;
}