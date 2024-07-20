import { fetchDashboards } from "./apiService";
import { useQuery, useQueryClient } from '@tanstack/react-query';
export const useDashboardData = (paramString) => {
  console.log('useDashboard')
  return useQuery({
    queryKey: [`dashboard/${paramString}`],
    queryFn: () => fetchDashboards(paramString),
    onSuccess: (data) => {
      console.log('resources fetch success!', data)
    }
  });
}

