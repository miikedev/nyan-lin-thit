import { format } from 'date-fns';

function groupDataByMonths(data) {
  if (!data) { return; }
  
  // Group data by months
  const groupedData = data.reduce((acc, item) => {
    const monthYear = format(new Date(item.date), 'MMM-yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += item.times; // Sum the times
    return acc;
  }, {});

  return groupedData;
}

function getSpanOfTime(dates, numColumns) {
  const spanSize = Math.ceil(dates.length / numColumns);
  const spans = [];

  for (let i = 0; i < numColumns; i++) {
    const startIdx = i * spanSize;
    const endIdx = Math.min((i + 1) * spanSize, dates.length) - 1;
    spans.push(`${dates[startIdx]} - ${dates[endIdx]}`);
  }

  return { spans, spanSize };
}

export function refinedDataForClineChart(dataResult, colorMapping, numColumns) {
  const groupedData = groupDataByMonths(dataResult);

  const groupedDataArray = Object.keys(groupedData).map(monthYear => ({
    monthYear,
    times: groupedData[monthYear]
  }));

  // Sort by date
  groupedDataArray.sort((a, b) => new Date(a.monthYear) - new Date(b.monthYear));

  // Define the spans based on the number of columns
  const dates = groupedDataArray.map(item => item.monthYear);
  const { spans, spanSize } = getSpanOfTime(dates, numColumns);

  const refinedData = spans.reduce((acc, span, index) => {
    const startIdx = index * spanSize;
    const endIdx = Math.min((index + 1) * spanSize, groupedDataArray.length);
    const spanSum = groupedDataArray.slice(startIdx, endIdx).reduce((sum, item) => sum + item.times, 0);
    acc[span] = spanSum;
    return acc;
  }, {});

  return refinedData;
}