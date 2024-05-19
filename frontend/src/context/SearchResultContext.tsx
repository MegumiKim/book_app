import React, { createContext, useState } from "react";
import { GoogleBookDataType } from "../types";

// Define the context type
export interface SearchResultContextType {
  searchResult: { url: string; results: GoogleBookDataType[] };
  setSearchResult: React.Dispatch<
    React.SetStateAction<{ url: string; results: GoogleBookDataType[] }>
  >;
}

// Create the context with the correct type
export const SearchResultContext = createContext<SearchResultContextType>(
  {} as SearchResultContextType
);

// Define the provider component
export const SearchResultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchResult, setSearchResult] = useState<{
    url: string;
    results: GoogleBookDataType[];
  }>({ url: "", results: [] });

  return (
    <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
      {children}
    </SearchResultContext.Provider>
  );
};
