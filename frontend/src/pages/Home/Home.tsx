// import { useEffect, useState } from "react";
import { KeyboardEvent, useContext, useState } from "react";
import {
  SearchResultContext,
  SearchResultContextType,
} from "../../context/SearchResultContext";

import RandomQuote from "./RandomQuote";
import { useNavigate } from "react-router-dom";
import Feed from "./Feed";
import Categories from "./Categories";
import searchIcon from "../../assets/search.svg";

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

  return (
    <main className="" id="home">
      <div className="background" id="background"></div>
      <div className="flex flex-col gap-10 align-middle mt-10 md:mt-0">
        <RandomQuote />

        <div className="w-full mx-auto sm:max-w-[500px] relative">
          <input
            type="text"
            placeholder="Book Search"
            value={inputValue}
            onKeyDown={handleKeyPress}
            onChange={(e) => setInputValue(e.target.value)}
            // onClick={clearInput}
            className="input w-full "
            autoFocus
          />
          {error && <p className="text-green-50 text-end m-2">{error}</p>}
          <button
            className="w-7 absolute top-2 right-3 cursor-pointer"
            onClick={() => searchBook(inputValue)}
            aria-label="search book"
          >
            <img src={searchIcon} alt="search" />
          </button>
        </div>
      </div>
      <Categories />
      <Feed />
    </main>
  );
};

export default Home;
