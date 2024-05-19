import { useContext } from "react";
import {
  SearchResultContext,
  SearchResultContextType,
} from "../../context/SearchResultContext";
import { useNavigate } from "react-router-dom";

function Categories() {
  const categories = ["fiction", "history", "mystery", "science", "romance"];
  const { setSearchResult } = useContext(
    SearchResultContext
  ) as unknown as SearchResultContextType;

  const navigate = useNavigate();

  async function handleClick(category: string) {
    const URL =
      import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API +
      `volumes?q=+subject:${category}`;

    try {
      const result = await fetch(URL);
      const json = await result.json();

      if (!result.ok) {
        throw new Error();
      } else {
        if (json.totalItems === 0) {
          return;
        }

        setSearchResult({ url: URL, results: json.items });
      }
    } catch (error) {
      console.error(error);
      // setError("Failed to Fetch Data");
    } finally {
      navigate("/search");
    }
  }
  return (
    <section className="my-20 sm:my-32">
      <div className="grid grid-cols-3 sm:grid-cols-5 justify-center gap-5 lg:gap-10">
        {categories.map((category) => (
          <div
            key={category}
            className="category-card"
            onClick={() => handleClick(category)}
          >
            <p>{category.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
