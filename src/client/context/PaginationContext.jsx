import { createContext, useContext, useState } from "react";

const PaginationContext = createContext();

export const usePaginationContext = () => useContext(PaginationContext);

export const PaginationProvider = ({ children }) => {
  const [page, setPage] = useState(1);

  return (
    <PaginationContext.Provider value={{ page, setPage }}>
      {children}
    </PaginationContext.Provider>
  );
};