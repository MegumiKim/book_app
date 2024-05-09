import React, { createContext, useState } from "react";
import { GoogleBookDataType } from "../types";

// Assuming SearchResultType is the type of your search result

export interface SearchResultContextType {
  searchResult: GoogleBookDataType[];
  setSearchResult: React.Dispatch<React.SetStateAction<GoogleBookDataType[]>>;
}

export const SearchResultContext = createContext<SearchResultContextType>(
  {} as SearchResultContextType
);

export const SearchResultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchResult, setSearchResult] = useState<GoogleBookDataType[]>([]);

  return (
    <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchResultContext.Provider>
  );
};
