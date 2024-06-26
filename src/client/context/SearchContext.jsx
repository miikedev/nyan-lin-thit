import { createContext, useContext, useState } from "react";

const SearchContext = createContext([]);

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }) => {
  const [searchingText, setSearchingText] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

    console.log('setSearchingText', searchingText);
  return (
    <SearchContext.Provider value={{ searchingText, setSearchingText, filteredData, setFilteredData }}>
      {children}
    </SearchContext.Provider>
  );
};