import { fetchDashboards, fetchDashboardChart, fetchDashboardMap } from "./apiService";
import { useQuery, useQueryClient } from '@tanstack/react-query';
export const useDashboardData = () => {

  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => fetchDashboards(),
    onSuccess: (data) => {
      console.log('resources fetch success!', data)
    }
  });
}

export const useDashboardChartData = (startDate, endDate) => {
  return useQuery({
    queryKey: [`chart/${startDate}/${endDate}`],
    queryFn: () => fetchDashboardChart(startDate, endDate),
    onSuccess: (data) => {
      console.log('resources fetch success!', data)
    }
  });
}

export const useDashboardMapData = (startDate, endDate) => {
  return useQuery({
    queryKey: [`map`],
    queryFn: () => fetchDashboardMap(),
    onSuccess: (data) => {
      console.log('resources fetch success!', data)
    }
  });
}

