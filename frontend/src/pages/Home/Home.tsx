// import { useEffect, useState } from "react";
import { useContext } from "react";
import BookSearch from "./BookSearch";
import BookCard from "../../components/BookCard";
import { SearchResultContext } from "../../context/SearchResultContext";
import { GoogleBookDataType } from "../../types";
import RandomQuote from "./RandomQuote";

interface SearchResultContextType {
  searchResult: [];
  setSearchResult: React.Dispatch<React.SetStateAction<[]>>;
}

const Home = () => {
  const { searchResult, setSearchResult } = useContext(
    SearchResultContext
  ) as unknown as SearchResultContextType;

  const handleSearch = (result: []) => {
    setSearchResult(result);
    console.log(result);
  };

  // const handleLoadMore = () => {
  //   console.log("load more");
  // };
  return (
    <main className="" id="home">
      <div className="background" id="background"></div>
      <RandomQuote />
      <BookSearch handleSearch={(result: []) => handleSearch(result)} />

      {searchResult && (
        <div className="mx-auto">
          {searchResult?.length ? (
            <div className="flex flex-col">
              <div className="grid gap-5 mx-auto sm:grid-cols-2 max-w-6xl px-4">
                {searchResult.map(
                  (item: { volumeInfo: GoogleBookDataType; id: string }) => (
                    <BookCard
                      key={item.id}
                      title={item.volumeInfo.title}
                      author={item.volumeInfo.authors?.[0]}
                      genre={item.volumeInfo.categories?.[0]}
                      thumbnail={item.volumeInfo.imageLinks?.thumbnail}
                      avr_rating={item.volumeInfo.averageRating}
                      status={null}
                      data={item.volumeInfo}
                      id={item.id}
                    />
                  )
                )}
              </div>
              {/* <button
                className="btn btn-outline mx-auto my-10 text-slate-200"
                onClickCapture={handleLoadMore}
              >
                Load More
              </button> */}
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
