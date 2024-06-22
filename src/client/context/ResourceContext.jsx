import { createContext, useContext, useState } from "react";

const ResourceContext = createContext();

export const useResourceContext = () => useContext(ResourceContext);

export const ResourceProvider = ({ children }) => {
  const [resource, setResource] = useState(null);

  return (
    <ResourceContext.Provider value={{ resource, setResource }}>
      {children}
    </ResourceContext.Provider>
  );
};