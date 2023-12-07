import React, { createContext, useState } from "react";

export const SearchResultContext = createContext();

export const Context = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchResultContext.Provider>
  );
};

// export const useSearchResult = () => {
//   return useContext(SearchResultContext);
// };
