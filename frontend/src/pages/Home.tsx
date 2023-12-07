// import { useEffect, useState } from "react";
import { useContext } from "react";
import BookSearch from "./BookSearch";
import BookCard from "./BookCard";
import { SearchResultContext } from "../context/Context";
import { GoogleBookDataType } from "../types";

interface SearchResultContextType {
  searchResult: [];
  setSearchResult: React.Dispatch<React.SetStateAction<[]>>;
}

const Home = () => {
  const { searchResult, setSearchResult } = useContext(
    SearchResultContext
  ) as SearchResultContextType;

  const handleSearch = (result: []) => {
    setSearchResult(result);
  };

  return (
    <main className="">
      <div id="background"></div>
      <div className="container m-auto mt-20 p-4 text-slate-200">
        <h1 className="text-center text-5xl my-5 max-w-xl m-auto">
          Make your reading permanent and personal
        </h1>
      </div>
      <BookSearch handleSearch={(result: []) => handleSearch(result)} />

      {searchResult && (
        <div className="mx-auto">
          {searchResult?.length ? (
            <div className="grid gap-5 mx-auto my-5 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl">
              {searchResult.map(
                (item: { volumeInfo: GoogleBookDataType; id: string }) => (
                  <BookCard key={item.id} data={item.volumeInfo} id={item.id} />
                )
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </main>
  );
};

export default Home;
