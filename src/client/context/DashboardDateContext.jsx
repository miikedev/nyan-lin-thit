import { createContext, useContext, useState } from "react";

const DashboardDateContext = createContext();

export const useDashboardDateContext = () => useContext(DashboardDateContext);

export const DashboardDateProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <DashboardDateContext.Provider value={{ startDate, endDate, setStartDate, setEndDate }}>
      {children}
    </DashboardDateContext.Provider>
  );
};