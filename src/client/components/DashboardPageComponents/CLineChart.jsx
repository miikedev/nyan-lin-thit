import React from 'react';
import * as d3 from 'd3'

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
import { useDashboardDataContext } from '../../context/DashboardDataContext'
// import { refinedDataForClineChart } from '../../../utils/new-utils';
import { getUniqueMonths, transformDates, getDateOfSpan, summarizeDataByTimeSpan,
   refinedDataForClineChart, extractCaseTypesWithTimes
} from '../../../utils/utils';
import { color } from 'chart.js/helpers';
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


export default function CLineChart({ width, height, fontSize, isFullWidth, dataResult }) {

  let summarizedData = [];
  if(dataResult !== undefined && dataResult.length > 0) {

    const groupedData = d3.rollups(
      dataResult,
      v => d3.sum(v, d => d.times),
      d => new Date(d.date).toLocaleDateString('en-CA',{month: 'short'}) + '-' + new Date(d.date).toLocaleDateString('en-CA',{year: 'numeric'}),
      d => d.case_type.name
    );
    // Transform grouped data into the desired format
     summarizedData = groupedData.flatMap(([date, caseTypes]) => 
      caseTypes.map(([case_type_name, times]) => ({
        date,
        case_type_name,
        times
      }))
    );
  }
  
  const colorMapping = {
    airstrike: {
      label: 'Airstrike',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    armed_clashes: {
      label: 'Armed Clashes',
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    massacre: {
      label: 'Massacre',
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    casualties: {
      label: 'Casualty',
      borderColor: 'rgb(201, 203, 207)',
      backgroundColor: 'rgba(201, 203, 207, 0.5)',
    },
    arrests: {
      label: 'Arrests',
      borderColor: 'rgb(153, 102, 255)',
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
    },
  };

  let labels = [];
  let result = [];
  if (summarizedData !== undefined) {
    const uniqueDates = Array.from(new Set(summarizedData.map(item => item.date)));

    labels = getDateOfSpan(uniqueDates, 12);

    const dataResult = summarizeDataByTimeSpan(summarizedData, labels)

    const extract = extractCaseTypesWithTimes(dataResult);

    const refinedData = refinedDataForClineChart(extract, colorMapping);

    result = Object.values(refinedData);
  }

  const data = {
    labels,
    datasets: result
  };

  return <Line options={options} data={data} width={width} height={height}/>;
}
