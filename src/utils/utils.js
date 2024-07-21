import { format } from 'date-fns';
export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function convertToDesiredFormat(inputString) {
  // Replace spaces with '%20'
  let formattedString = inputString.replace(/ /g, '%20');
  // Replace apostrophes with '%27'
  formattedString = formattedString.replace(/'/g, '%27');
  return formattedString;
}

import _ from 'lodash';

export function transformDates(dataResult) {
  return dataResult.map(data => new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));
}
export function getUniqueMonths(data) {
  // Convert dates to timestamps
  const timestamps = data.map((dateString) => Date.parse(dateString));

  // Sort timestamps
  timestamps.sort((a, b) => a - b);

  // Group timestamps by month
  const monthGroups = _.groupBy(timestamps, (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  });

  // Get unique months
  const uniqueMonths = Object.keys(monthGroups).sort((a, b) => new Date(a) - new Date(b));

  return uniqueMonths.map(month => {
    const [year, monthIndex] = month.split('-');
    return `${new Date(year, monthIndex - 1).toLocaleString('default', { month: 'short' })}-${year}`;
  });
}
//old code start
export function getSpanOfTime(dates, numColumns) {
  const spanSize = Math.ceil(dates.length / numColumns);
  const spans = [];

  for (let i = 0; i < numColumns; i++) {
    const startIdx = i * spanSize;
    const endIdx = Math.min((i + 1) * spanSize, dates.length) - 1;
    spans.push(`${dates[startIdx]} - ${dates[endIdx]}`);
  }

  return spans;
} 

export function refinedDataForClineChart(dataResult, colorMapping) {
  return dataResult.reduce((acc, item) => {
    const caseTypeName = item.case_type.name;
    if (!acc[caseTypeName]) {
      const colorsAndLabel = colorMapping[caseTypeName] || {
           
      };
      acc[caseTypeName] = {
        label: caseTypeName,
        data: [],
        ...colorsAndLabel,
        radius: 5,
      };
    }
    acc[caseTypeName].data.push(item.times);
    return acc;
  }, {});
}
//old code end
//new code
// Helper function to determine which time span a date falls into
// export function getSpanOfTime(date, timeSpans) {
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const monthYear = `${month}-${year}`;
  
//   return timeSpans.find(span => {
//     const [start, end] = span.split(' - ');
//     const [startMonth, startYear] = start.split('-').map(Number);
//     const [endMonth, endYear] = end.split('-').map(Number);
//     const isAfterStart = (year > startYear) || (year === startYear && month >= startMonth);
//     const isBeforeEnd = (year < endYear) || (year === endYear && month <= endMonth);
//     return isAfterStart && isBeforeEnd;
//   }) || "Unknown";
// }

// export function refinedDataForClineChart(dataResult, colorMapping, timeSpans) {
//   const acc = {};
  
//   timeSpans.forEach(span => {
//     acc[span] = {}; // Ensure each time span is initialized
//   });

//   // Process each item to sum times within each time span
//   dataResult.forEach(item => {
//     const caseTypeName = item.case_type.name;
//     const itemDate = new Date(item.date);
//     const span = getSpanOfTime(itemDate, timeSpans);

//     // Ensure the span is valid and initialized
//     if (!acc[span]) {
//       console.error(`Time span ${span} is not defined.`);
//       return;
//     }
    
//     if (!acc[span][caseTypeName]) {
//       acc[span][caseTypeName] = 0;
//     }
//     acc[span][caseTypeName] += item.times;
//   });

//   // Prepare the final data structure for the chart
//   const dataset = Object.keys(colorMapping).map(caseTypeName => {
//     const data = timeSpans.map(span => acc[span][caseTypeName] || 0);
//     return {
//       label: caseTypeName,
//       data: data,
//       ...colorMapping[caseTypeName],
//       radius: 5,
//     };
//   });

//   return dataset;
// }

//new code
