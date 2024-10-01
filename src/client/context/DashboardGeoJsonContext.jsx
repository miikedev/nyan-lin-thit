import { createContext, useContext, useState } from "react";

const DashboardFilterContext = createContext();

export const useDashboardGeoJsonFilterContext = () => useContext(DashboardFilterContext);

export const DashboardGeoJsonFilterProvider = ({ children }) => {
  const [ filteredGeoJson, setFilteredGeoJson ] = useState([])
    console.log(filteredGeoJson);
  return (
    <DashboardFilterContext.Provider value={{ filteredGeoJson, setFilteredGeoJson }}>
      {children}
    </DashboardFilterContext.Provider>
  );
};