// utils/refineDataForClineChart.js
import { format, isValid } from 'date-fns';

export function refinedDataForClineChart(dataResult, colorMapping) {
  const groupedData = dataResult.reduce((acc, item) => {
    if (isValid(item.date)) {
      const monthYear = format(item.date, 'MMM-yyyy');
      const caseTypeName = item.case_type.name;

      if (!acc[monthYear]) {
        acc[monthYear] = {};
      }

      if (!acc[monthYear][caseTypeName]) {
        acc[monthYear][caseTypeName] = 0;
      }

      acc[monthYear][caseTypeName] += item.times;
    }
    return acc;
  }, {});

  const datasets = {};
  Object.entries(groupedData).forEach(([monthYear, caseTypes]) => {
    Object.entries(caseTypes).forEach(([caseTypeName, times]) => {
      if (!datasets[caseTypeName]) {
        const colorsAndLabel = colorMapping[caseTypeName] || {
          label: caseTypeName,
          borderColor: 'rgb(0, 0, 0)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        };
        datasets[caseTypeName] = {
          label: caseTypeName,
          data: [],
          ...colorsAndLabel,
          radius: 5,
        };
      }
      datasets[caseTypeName].data.push({ x: monthYear, y: times });
    });
  });

  return Object.values(datasets);
}