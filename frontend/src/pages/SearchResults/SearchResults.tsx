import BookCard from "../../components/BookCard";
import { useContext, useState } from "react";
import { SearchResultContext } from "../../context/SearchResultContext";
import BookSearch from "./BookSearch";
import { GoogleBookDataType } from "../../types";

function SearchResults() {
  const { searchResult, setSearchResult } = useContext(SearchResultContext);
  const [URL, setURL] = useState("");
  const [paginationIndex, setPaginationIndex] = useState(10);

  const handleSearch = (results: GoogleBookDataType[], URL: string) => {
    setURL(URL);
    if (results.length > 0) {
      const uniqueIds = new Set<string>();
      const filteredResults = results.filter((result) => {
        if (!uniqueIds.has(result.id)) {
          uniqueIds.add(result.id);
          return true; // keep this result, it's unique so far
        }
        return false; // skip this result, it's a duplicate
      });

      setSearchResult(filteredResults);
    } else {
      setSearchResult([]);
    }
  };

  async function handleLoadMore() {
    const paginationURL = `${URL}&startIndex=${paginationIndex}`;

    try {
      const result = await fetch(paginationURL);

      if (result.ok) {
        const json = await result.json();

        setSearchResult((prev) => [...prev, ...json.items]);
      }
    } catch (error) {
      console.log(error);
    }
    setPaginationIndex(paginationIndex + 10);
  }

  return (
    <main className="flex flex-col gap-10">
      <BookSearch
        handleSearch={(result: [], URL) => handleSearch(result, URL)}
      />
      {searchResult?.length > 0 ? (
        <div className="flex flex-col">
          <div className="bookshelf">
            {searchResult.map((item) => (
              <BookCard
                key={item.id}
                title={item.volumeInfo.title}
                author={item.volumeInfo.authors?.[0]}
                genre={item.volumeInfo.categories?.[0]}
                thumbnail={item.volumeInfo.imageLinks?.thumbnail || ""}
                avr_rating={item.volumeInfo.averageRating}
                status={undefined}
                id={item.id}
                publishedDate={item.volumeInfo.publishedDate}
                saleInfo={item.saleInfo}
              />
            ))}
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
    </main>
  );
}

export default SearchResults;
