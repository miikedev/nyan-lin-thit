import { createContext, useContext, useState } from "react";

const DashboardDataContext = createContext();

export const useDashboardDataContext = () => useContext(DashboardDataContext);

export const DashboardDataProvider = ({ children }) => {
  const [dataResult, setDataResult] = useState([]);
  return (
    <DashboardDataContext.Provider value={{ dataResult, setDataResult }}>
      {children}
    </DashboardDataContext.Provider>
  );
};