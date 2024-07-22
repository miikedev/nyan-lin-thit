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
import * as d3 from 'd3'


export default function CLineChart({ width, height, fontSize, isFullWidth, dataResult }) {
  console.log('data result: ', dataResult);
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
    
    console.log('summarized data',summarizedData);
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
  // const refinedData = [];
  let labels = [];
  let result = [];
  if (summarizedData !== undefined) {
    // const transformedDates = transformDates(summarizedData);
    // // const databymonths = groupDataByMonths(summarizedData);
    // const uniqueMonths = getUniqueMonths(transformedDates);
    // console.log('unique months', uniqueMonths);
    const uniqueDates = Array.from(new Set(summarizedData.map(item => item.date)));
    console.log('unique dates',uniqueDates);
    labels = getDateOfSpan(uniqueDates, 12);
    console.log('labels', labels);
    const dataResult = summarizeDataByTimeSpan(summarizedData, labels)
    console.log('result', dataResult)
    const extract = extractCaseTypesWithTimes(dataResult);
    console.log('extract', extract)
    // const mapping = extract.map(item => {
    //   if(colorMapping.airstrike =)
    // })
    console.log(extract)
    // labels = timeSpans;
    // console.log('timeSpans',timeSpans);
    // const refinedData = refinedDataForClineChart(summarizedData, colorMapping, timeSpans);
    // console.log('refinedData', refinedData)
    // result = Object.values(refinedData);
  }
  console.log('result', result)
  const data = {
    labels,
    datasets: result
  };
  
  //   const refinedData = data.reduce((acc, item) => {
  //     const caseTypeName = item.case_type.name;
  //     if (!acc[caseTypeName]) {
  //         acc[caseTypeName] = {
  //             name: caseTypeName,
  //             times: []
  //         };
  //     }
  //     acc[caseTypeName].times.push(item.times);
  //     return acc;
  //   }, {});

  // const result = Object.values(refinedData);

  // console.log(result);
  return <Line options={options} data={data} width={width} height={height}/>;
}
