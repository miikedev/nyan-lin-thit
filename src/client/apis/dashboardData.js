import { fetchDashboards, fetchDashboardChart } from "./apiService";
import { useQuery, useQueryClient } from '@tanstack/react-query';
export const useDashboardData = ({startDate, endDate}) => {
  console.log('useDashboard')
	console.log('date', startDate, endDate); 
  const query = startDate && endDate ? `dashboard?startDate=${startDate}&endDate=${endDate}` : 'dashboard'
  return useQuery({
    queryKey: [query],
    queryFn: () => fetchDashboards(startDate, endDate),
    onSuccess: (data) => {
      console.log('resources fetch success!', data)
    }
  });
}
export const useDashboardChartData = () => {
  return useQuery({
    queryKey: ['chart'],
    queryFn: () => fetchDashboardChart(),
    staleTime: 120000,
    onSuccess: (data) => {
      console.log('resources fetch success!', data)
    }
  });
}

