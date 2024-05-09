import { MouseEvent, useContext } from "react";
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
      console.log(URL, json);
      if (!result.ok) {
        throw new Error();
      } else {
        if (json.totalItems === 0) {
          return;
        }
        setSearchResult(json.items);
        navigate("/search");
      }
    } catch (error) {
      console.error(error);
      // setError("Failed to Fetch Data");
    }
  }
  return (
    <section className="my-10 md:my-32">
      <div className="grid grid-cols-3 sm:grid-cols-5 justify-around gap-10">
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
