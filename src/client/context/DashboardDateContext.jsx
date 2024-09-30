import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DashboardDateContext = createContext();

export const useDashboardDateContext = () => useContext(DashboardDateContext);

export const DashboardDateProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // useEffect(()=>{
  //   setSearchParams({startDate: startDate, endDate: endDate});
  // },[searchParams])
  return (
    <DashboardDateContext.Provider value={{ startDate, endDate, setStartDate, setEndDate }}>
      {children}
    </DashboardDateContext.Provider>
  );
};