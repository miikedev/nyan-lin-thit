import { createContext, useContext, useState } from "react";

const DashboardFilterContext = createContext();

export const useDashboardFilterContext = () => useContext(DashboardFilterContext);

export const DashboardFilterProvider = ({ children }) => {
  const [ filteredData, setFilteredData ] = useState([])

  return (
    <DashboardFilterContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </DashboardFilterContext.Provider>
  );
};