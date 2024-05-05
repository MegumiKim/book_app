// import { useEffect, useState } from "react";
import { KeyboardEvent, useContext, useState } from "react";
import { SearchResultContext } from "../../context/SearchResultContext";
import { GoogleBookDataType } from "../../types";
import RandomQuote from "./RandomQuote";
import { useNavigate } from "react-router-dom";
import Feed from "./Feed";
// import Feed from "./Feed";

interface SearchResultContextType {
  searchResult: GoogleBookDataType[];
  setSearchResult: React.Dispatch<React.SetStateAction<[]>>;
}

const Home = () => {
  const { setSearchResult } = useContext(
    SearchResultContext
  ) as unknown as SearchResultContextType;

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    setError("");
    if (e.key === "Enter") {
      e.preventDefault();
      searchBook(inputValue);
    }
    return;
  }

  async function searchBook(searchTerm: string) {
    const URL =
      import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API +
      "volumes?q=" +
      searchTerm;

    try {
      const result = await fetch(URL);
      const json = await result.json();
      // console.log(URL, json);
      if (!result.ok) {
        throw new Error();
      } else {
        if (json.totalItems === 0) {
          setError("No book found");
          return;
        }
        setSearchResult(json.items);
        navigate("/search");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to Fetch Data");
    }
  }

  function clearInput() {
    setInputValue("");
  }

  return (
    <main className="" id="home">
      <div className="background" id="background"></div>
      <div className="flex flex-col gap-10 align-middle my-20">
        <RandomQuote />

        <div className="w-full mx-auto sm:max-w-[500px]">
          <input
            type="text"
            placeholder="Book Search"
            value={inputValue}
            onKeyDown={handleKeyPress}
            onChange={(e) => setInputValue(e.target.value)}
            onClick={clearInput}
            className="input w-full "
            autoFocus
          />
          {error && <p className="text-green-50 text-end m-2">{error}</p>}
        </div>
      </div>

      <Feed />
    </main>
  );
};

export default Home;
