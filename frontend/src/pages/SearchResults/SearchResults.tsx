import BookCard from "../../components/BookCard";
import { useContext, useState } from "react";
import { SearchResultContext } from "../../context/SearchResultContext";
import BookSearch from "./BookSearch";

function SearchResults() {
  const { searchResult, setSearchResult } = useContext(SearchResultContext);
  const [paginationIndex, setPaginationIndex] = useState(10);
  const [err, setErr] = useState("");

  console.log(searchResult);

  async function handleLoadMore() {
    setErr("");
    const paginationURL = `${searchResult.url}&startIndex=${paginationIndex}`;

    try {
      const result = await fetch(paginationURL);
      const json = await result.json();

      if (result.ok) {
        // setSearchResult({ url: paginationURL, results: json.items });
        setSearchResult((prev) => ({
          url: prev.url,
          results: [...prev.results, ...json.items],
        }));
      }
    } catch (error) {
      setErr("Failed to fetch books");
    }
    setPaginationIndex(paginationIndex + 10);
  }

  return (
    <main className="flex flex-col gap-10">
      <BookSearch />

      {err !== "" && <p>{err}</p>}

      {searchResult?.results?.length > 0 ? (
        <div className="flex flex-col">
          <div className="bookshelf">
            {searchResult.results.map((item) => (
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
            onClick={handleLoadMore}
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
