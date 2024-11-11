import React, { createContext, useContext, useState } from "react";

const context = createContext({ children });
export const searchContext = () => {
  const [search, setSearch] = useState("");
  return (
    <context.Provider value={{ search, setSearch }}>
      {children}
    </context.Provider>
  );
};

export const useSearch = () => useContext(context);
