import { useEffect } from 'react';

import { useDashboardChartData } from '../apis/dashboardData';
import { useDashboardDataContext } from '../context/DashboardDataContext';

const useDate = (startDate, endDate) => {
    const {setDataResult} = useDashboardDataContext();
    const {data, isSuccess} = useDashboardChartData();
    useEffect(() => {
        console.log('date from hook ')
        console.log('data from hook ' +  isSuccess && setDataResult(data))
    }, [endDate, isSuccess]);

}
export default useDate