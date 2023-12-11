// import { useEffect, useState } from "react";
import { useContext } from "react";
import BookSearch from "./BookSearch";
import BookCard from "./BookCard";
import { SearchResultContext } from "../../context/BookContext";
import { GoogleBookDataType } from "../../types";
import RandomQuote from "./RandomQuote";

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

  const handleLoadMore = () => {
    console.log("load more");
  };
  return (
    <main className="">
      <div id="background"></div>

      <RandomQuote />

      <BookSearch handleSearch={(result: []) => handleSearch(result)} />

      {searchResult && (
        <div className="mx-auto">
          {searchResult?.length ? (
            <div className="flex flex-col">
              <div className="grid gap-5 mx-auto my-5 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl">
                {searchResult.map(
                  (item: { volumeInfo: GoogleBookDataType; id: string }) => (
                    <BookCard
                      key={item.id}
                      data={item.volumeInfo}
                      id={item.id}
                    />
                  )
                )}
              </div>
              <button
                className="btn btn-outline mx-auto my-10 text-slate-200"
                onClickCapture={handleLoadMore}
              >
                Load More
              </button>
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
