import React, { createContext, useState } from "react";

// Assuming SearchResultType is the type of your search result
interface SearchResultType {}

interface SearchResultContextType {
  searchResult: SearchResultType[];
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResultType[]>>;
}

export const SearchResultContext = createContext<SearchResultContextType>(
  {} as SearchResultContextType
);

export const SearchResultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchResult, setSearchResult] = useState<SearchResultType[]>([]);

  return (
    <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchResultContext.Provider>
  );
};
