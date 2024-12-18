import * as d3 from 'd3';

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
export function processDateRanges(dateRanges) {
  // Helper function to format and shorten the date range
  const shortenDateRange = (dateRange) => {
    const [start, end] = dateRange.split(' - ');

    const formatDate = (date) => {
      const [month, year] = date.split(' ');
      return `${year.slice(2)}${month}`;  // Format as YYMon (e.g., 22Sep)
    };

    return `${formatDate(start)}-${formatDate(end)}`;
  };

  // Helper function to sort the date ranges based on the start date
  const sortDateRanges = (dateRanges) => {
    return dateRanges.sort((a, b) => {
      const startDateA = new Date(a.split(' - ')[0] + " 1");
      const startDateB = new Date(b.split(' - ')[0] + " 1");
      return startDateA - startDateB;
    });
  };

  // Sort and shorten the date ranges
  const sortedDateRanges = sortDateRanges(dateRanges);
  return sortedDateRanges.map(shortenDateRange);
}



export function formatReadableText(text) {
  // Check if the text is null or undefined
  if (text === null || text === undefined) return '';

  // Ensure the text is a string before processing it
  return String(text)
    .split('_')  // Split the text by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize the first letter of each word
    .join(' ');  // Join the words with spaces
}

export function refinedDataForClineChart(dataResult, colorMapping) {
  return dataResult.reduce((acc, item) => {
    const caseTypeName = item.name;
    if (!acc[caseTypeName]) {
      const colorsAndLabel = colorMapping[caseTypeName] || {
           
      };
      acc[caseTypeName] = {
        label: caseTypeName,
        data: item.times,
        ...colorsAndLabel,
        radius: 5,
      };
    }
    acc[caseTypeName]
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

export const colorMapping = {  
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
export const getChartData = (dataResult) => {  
  if (!dataResult || dataResult.length === 0) return { labels: [], datasets: [] };  
  // Grouping data by date and case type  
  const groupedData = d3.rollups(  
    dataResult,  
    v => d3.sum(v, d => d.times),  
    d => new Date(d.date).toLocaleDateString('en-CA', { month: 'short' }) + '-' + new Date(d.date).toLocaleDateString('en-CA', { year: 'numeric' }),  
    d => d.case_type.name  
  );  

  // Transform grouped data into the desired format  
  const summarizedData = groupedData.flatMap(([date, caseTypes]) =>  
    caseTypes.map(([case_type_name, times]) => ({  
      date,  
      case_type_name,  
      times  
    }))  
  );  

  const uniqueDates = Array.from(new Set(summarizedData.map(item => item.date)));  
  const labels = getDateOfSpan(uniqueDates, 12);  
  const dataSummary = summarizeDataByTimeSpan(summarizedData, labels);  
  const extractedData = extractCaseTypesWithTimes(dataSummary);  
  const refinedData = refinedDataForClineChart(extractedData, colorMapping);  

  const datasets = Object.values(refinedData);  

  return { labels, datasets };  
};  
