import {
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useState,
  useContext,
} from "react";
import CreatableSelect from "react-select/creatable";
import { categories } from "../../utils/bookCategories";
import searchIcon from "../../assets/search.svg";
import { SearchResultContext } from "../../context/SearchResultContext";
import { useNavigate } from "react-router-dom";
import { GoogleBookDataType } from "../../types";

interface SelectedCategory {
  value: string;
  label: string;
}
const BookSearch = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [free, setFree] = useState(false);
  const [latest, setLatest] = useState(false);
  const [error, setError] = useState("");
  const { setSearchResult } = useContext(SearchResultContext);
  const navigate = useNavigate();

  async function searchBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const titleQuery = title ? title.trim() : "";
    const authorQuery = author ? `+inauthor:${author.trim()}` : "";
    const categoryQuery = selectedCategory
      ? `+subject:${selectedCategory.value}`
      : "";
    const freeQuery = free ? "&filter=free-ebooks" : "";
    const latestQuery = latest ? "&orderBy=newest" : "";

    const URL =
      import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API +
      "volumes?q=" +
      titleQuery +
      authorQuery +
      categoryQuery +
      freeQuery +
      latestQuery;
    // "&projection=lite";

    try {
      const result = await fetch(URL);
      const json = await result.json();

      if (result.ok) {
        if (json.totalItems === 0) {
          setError("No book found :-/");

          return;
        }

        const uniqueIds = new Set<string>();
        const filteredResults = json.items.filter(
          (result: GoogleBookDataType) => {
            if (!uniqueIds.has(result.id)) {
              uniqueIds.add(result.id);
              return true; // keep this result, it's unique so far
            }
            return false; // skip this result, it's a duplicate
          }
        );

        setSearchResult({ url: URL, results: filteredResults });

        // handleSearch(json.items, URL);
        setTitle("");
        setAuthor("");
        setError("");
        setLatest(false);
        setFree(false);

        navigate("/search");
      } else {
        throw new Error();
      }
    } catch (error) {
      setError("Failed to fetch books");
      console.error(error);
    }
  }

  const handleCategoryChange = (
    newValue: { value: string; label: string } | null
  ) => {
    if (newValue === null) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(newValue);
    }
  };

  function handleCheckBox(
    e: KeyboardEvent<HTMLInputElement>,
    setState: (value: SetStateAction<boolean>) => void
  ) {
    if (e.key !== "Enter") return;
    e.preventDefault();

    // Correct type assertion for e.target
    const target = e.target as HTMLInputElement;
    target.checked = !target.checked; // Now this line is valid

    setState((prevState) => !prevState);
  }

  return (
    <section className="items-center flex flex-col text-slate-200 overflow-visible sm:min-w-[500px]">
      <form
        onSubmit={(e) => searchBook(e)}
        className="flex flex-col gap-3 p-4 sm:p-6 bg-opacity-80 rounded-lg w-full overflow-visible search-input"
      >
        <div className="flex justify-between">
          <p className="text-red-400 font-bold">{error}</p>{" "}
        </div>
        <div className="">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="search..."
              className="input input-bordered input-secondary w-full bg-transparent focus:bg-opacity-90 focus:bg-slate-700 text-slate-200 "
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="w-7 absolute top-2 right-3 cursor-pointer"
              aria-label="search book"
              type="submit"
            >
              <img src={searchIcon} alt="search" />
            </button>
          </div>
          <div className="form-control">
            <label className="cursor-pointer mt-3 self-end flex justify-end gap-2">
              <p className=" text-slate-200 label-text ">Advanced Search</p>
              <input
                id="showAdvancedSearch"
                type="checkbox"
                className="toggle toggle-secondary "
                onChange={() =>
                  setShowAdvancedSearch((prevState) => !prevState)
                }
                onKeyDown={(e) => handleCheckBox(e, setShowAdvancedSearch)}
              />
            </label>
          </div>
        </div>
        {showAdvancedSearch && (
          <fieldset className="flex flex-col md:flex-row gap-3 sm:gap-5 md:mt-5 overflow-visible">
            <div className="flex flex-col  gap-3 flex-1">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                className="input w-full bg-white h-[38px] focus:bg-opacity-90 rounded-sm text-slate-700"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 flex-1 overflow-visible z-10">
              <label htmlFor="">Category / Subject</label>
              <CreatableSelect
                className="text-slate-800 leading-tight overflow-visible z-10"
                isClearable
                isSearchable
                onChange={(selectedCategory) =>
                  handleCategoryChange(selectedCategory)
                }
                options={categories}
                value={selectedCategory}
                placeholder="Select or type..."
                getNewOptionData={(inputValue) => ({
                  label: inputValue,
                  value: inputValue.toLowerCase().replace(/\W/g, ""),
                })}
              />
            </div>
            <div className="flex flex-row md:flex-col justify-center gap-2">
              <div className="flex gap-4 justify-end">
                <label htmlFor="checkbox">Free ebook</label>
                <input
                  id="free_ebook"
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  onChange={(event) => setFree(event.target.checked)}
                  checked={free}
                  onKeyDown={(e) => handleCheckBox(e, setFree)}
                />
              </div>
              <div className="flex gap-4 justify-end">
                <label htmlFor="checkbox">Latest</label>
                <input
                  id="latest"
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  onChange={(event) => setLatest(event.target.checked)}
                  checked={latest}
                  onKeyDown={(e) => handleCheckBox(e, setLatest)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-secondary bg-opacity-75 text-slate-200 my-auto"
            >
              Search
            </button>
          </fieldset>
        )}
      </form>
    </section>
  );
};

export default BookSearch;
