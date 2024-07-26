import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDashboardFilterContext } from '../../context/DashboardFilterContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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

export default function CLineChartStacked({ width, height, fontSize, isFullWidth, newDataResult, paramResult }) {
  const caseColors = {
    'airstrike': { backgroundColor: 'rgba(255, 99, 132, 0.5)', borderColor: 'rgb(255, 99, 132)' },
    'armed_clashes': { backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgb(54, 162, 235)' },
    'massacre': { backgroundColor: 'rgba(255, 206, 86, 0.5)', borderColor: 'rgb(255, 206, 86)' },
    'casualties': { backgroundColor: 'rgba(75, 192, 192, 0.5)', borderColor: 'rgb(75, 192, 192)' },
    'arrests': { backgroundColor: 'rgba(153, 102, 255, 0.5)', borderColor: 'rgb(153, 102, 255)' },
  };

  const caseName = {
    1: 'airstrike',
    2: 'armed_clashes',
    3: 'massacre',
    4: 'casualties',
    5: 'arrests',
  };

  const { filterParams } = useDashboardFilterContext();
  const resultedParamId = useMemo(() => filterParams.map(param => param.id), [filterParams]);
  const resultedParamNames = useMemo(() => resultedParamId.map(id => caseName[id] || ""), [resultedParamId]);

  if (newDataResult === undefined) return null;

  console.log('paramResult', paramResult);
  console.log('stacked chart', newDataResult);
  console.log('filter params', resultedParamNames);

  const { labels, datasets: regionDataDatasets } = newDataResult.regionData;

  const filteredData = resultedParamNames.length > 0
    ? regionDataDatasets.filter(region => resultedParamNames.includes(region.label))
    : regionDataDatasets;

  const result = filteredData.map(region => {
    const colors = caseColors[region.label] || { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderColor: 'rgb(0, 0, 0)' }; // Default color if label not found
    return {
      label: region.label,
      data: region.data,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      fill: true,
    };
  });

  console.log('stacked result', result);

  const data = {
    labels: labels,
    datasets: result,
  };

  return <Line options={options} data={data} width={width} height={height} />;
}

