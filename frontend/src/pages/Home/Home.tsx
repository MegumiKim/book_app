// import { useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";
import BookSearch from "./BookSearch";
import BookCard from "../../components/BookCard";
import { SearchResultContext } from "../../context/SearchResultContext";
import { GoogleBookDataType } from "../../types";
import RandomQuote from "./RandomQuote";

interface SearchResultContextType {
  searchResult: { id: string }[];
  setSearchResult: React.Dispatch<React.SetStateAction<[]>>;
}

const Home = () => {
  const { searchResult, setSearchResult } = useContext(
    SearchResultContext
  ) as unknown as SearchResultContextType;

  const [showRandomQuote, setShowRandomQuote] = useState(true);

  useEffect(() => {
    if (searchResult?.length > 0) {
      // Start the animation then hide the component
      setShowRandomQuote(false);
    }
  }, [searchResult]);

  const handleSearch = (results: { id: string }[]) => {
    if (results.length > 0) {
      const uniqueIds = new Set<string>();
      const filteredResults = results.filter((result) => {
        if (!uniqueIds.has(result.id)) {
          uniqueIds.add(result.id);
          return true; // keep this result, it's unique so far
        }
        return false; // skip this result, it's a duplicate
      });
      // console.log(filteredResults);

      setSearchResult(filteredResults);
    } else {
      setSearchResult([]);
    }

    // console.log(result);
  };

  // const handleLoadMore = () => {
  //   console.log("load more");
  // };
  return (
    <main className="" id="home">
      <div className="background" id="background"></div>
      {showRandomQuote && <RandomQuote />}
      <BookSearch handleSearch={(result: []) => handleSearch(result)} />

      {searchResult && (
        <div className="mx-auto">
          {searchResult?.length > 0 ? (
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
                      id={item.id}
                      created_at={null}
                      saleInfo={item.saleInfo}
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
