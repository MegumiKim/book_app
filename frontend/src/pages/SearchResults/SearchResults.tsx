import BookCard from "../../components/BookCard";
import { useContext } from "react";
import { SearchResultContext } from "../../context/SearchResultContext";
import BookSearch from "../Home/BookSearch";
import { GoogleBookDataType } from "../../types";

function SearchResults() {
  const { searchResult, setSearchResult } = useContext(SearchResultContext);

  const handleSearch = (results: GoogleBookDataType[]) => {
    console.log(results);

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
  };

  return (
    <main className="flex flex-col gap-10">
      <BookSearch handleSearch={(result: []) => handleSearch(result)} />
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
    </main>
  );
}

export default SearchResults;
