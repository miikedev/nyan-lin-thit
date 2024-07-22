import * as d3 from 'd3'
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
export function getDateOfSpan(dates, numColumns) {
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
    const caseTypeName = item.name;
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
export function extractCaseTypesWithTimes(summarizedData) {  
  const caseTypeMap = {};  

  // Loop through each time span data  
  summarizedData.forEach(({ span, data }) => {  
      // Loop through each case type in the span data  
      for (const caseType in data) {  
          if (!caseTypeMap[caseType]) {  
              // Initialize the case type if it doesn't exist  
              caseTypeMap[caseType] = { name: caseType, times: [] };  
          }  
          // Push the count of times for this case type  
          caseTypeMap[caseType].times.push(data[caseType]);  
      }  
  });  

  // Convert the map object to an array  
  return Object.values(caseTypeMap);  
}  

export function summarizedDataBySpan(data, spans, dateFormat = 'MMM-YYYY') {
  // Convert spans to a more accessible structure
  const spanRanges = spans.map(span => {
    const [start, end] = span.split(' - ');
    return { start, end };
  });

  // Initialize result object
  const result = spanRanges.map(range => ({
    span: `${range.start} - ${range.end}`,
    data: {}
  }));

  // Group data by case_type_name and date
  const groupedData = d3.rollups( 
    data,
    v => d3.sum(v, d => d.times),
    d => d.case_type_name,
    d => d.date
  );

  // Populate the result object
  groupedData.forEach(([case_type_name, dateGroups]) => {
    dateGroups.forEach(([date, times]) => {
      spanRanges.forEach((range, idx) => {
        const formattedDate = d3.timeFormat(dateFormat)(new Date(date));
        if (formattedDate >= range.start && formattedDate <= range.end) {
          if (!result[idx].data[case_type_name]) {
            result[idx].data[case_type_name] = 0;
          }
          result[idx].data[case_type_name] += times;
        }
      });
    });
  });

  return result;
}

const parseDate = d3.timeParse("%b-%Y");
const formatDate = d3.timeFormat("%b-%Y");

// Function to check if a date falls within a time span
function isDateInRange(date, range) {
  const [start, end] = range.split(' - ').map(parseDate);
  const formattedDate = parseDate(date);
  return formattedDate >= start && formattedDate <= end;
}

// Function to summarize data by time spans
export function summarizeDataByTimeSpan(data, timeSpans) {
  const result = [];

  timeSpans.forEach(span => {
    const [start, end] = span.split(' - ');
    const spanData = { span, data: {} };

    data.forEach(({ case_type_name, times, date }) => {
      if (isDateInRange(date, span)) {
        if (!spanData.data[case_type_name]) {
          spanData.data[case_type_name] = 0;
        }
        spanData.data[case_type_name] += times;
      }
    });

    result.push(spanData);
  });

  return result;
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
