import { createContext, useContext, useState } from "react";

const DashboardFilterContext = createContext();

export const useDashboardFilterContext = () => useContext(DashboardFilterContext);

export const DashboardFilterProvider = ({ children }) => {
  const [ filteredData, setFilteredData ] = useState([])
  const [ filterParams, setFilterParams ] = useState([])

  return (
    <DashboardFilterContext.Provider value={{ filteredData, setFilteredData, filterParams, setFilterParams }}>
      {children}
    </DashboardFilterContext.Provider>
  );
};