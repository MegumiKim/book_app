import { FormEvent, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { categories } from "../../utils/bookCategories";

interface BookSearchProps {
  handleSearch: (result: []) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ handleSearch }) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [free, setFree] = useState(false);
  const [latest, setLatest] = useState(false);
  const [error, setError] = useState("");

  async function searchBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const titleQuery = title ? title.trim() : "";
    const authorQuery = author ? `+inauthor:${author.trim()}` : "";
    const categoryQuery = selectedCategory
      ? `+subject:${selectedCategory}`
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
      console.log(URL, json);
      if (result.ok) {
        if (json.totalItems === 0) {
          setError("No book found :-/");

          handleSearch([]);
          return;
        }

        handleSearch(json.items);
      } else {
        throw new Error();
      }
    } catch (error) {
      setError("Failed to fetch books");
      console.error(error);
    }
  }

  function handleClear(e) {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      setTitle("");
      // setAuthor("");
      // setSelectedCategory({ value: "", label: "" });
      // setFree(false);
      // setLatest(false);
      setError("");
    }
    return;
  }

  const handleCategoryChange = (
    newValue: { value: string; label: string } | null
  ) => {
    if (newValue === null) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(newValue.value);
    }
  };

  function handleCheckBox(e, setState) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    e.target.checked = !e.target.checked;
    setState((prevState) => !prevState);
  }

  return (
    <section className="items-center flex flex-col text-slate-200 overflow-visible ">
      <form
        onSubmit={(e) => searchBook(e)}
        className="flex flex-col gap-3 bg-slate-800 p-4 sm:p-6 bg-opacity-80 rounded-lg w-full lg:w-[1000px] overflow-visible"
      >
        <div className="flex justify-between">
          <p className="text-red-400 font-bold">{error}</p>{" "}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
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
              type="button"
              aria-label="clear"
              className="btn btn-xs absolute right-3 top-3"
              onClick={(e) => handleClear(e)}
              onKeyDown={(e) => handleClear(e)}
            >
              X
            </button>
          </div>
          <div className="form-control">
            <label className="cursor-pointer flex self-end sm:flex-col">
              <p className=" text-slate-200 label-text sm:order-2">
                Show Advanced Search
              </p>
              <input
                id="showAdvancedSearch"
                type="checkbox"
                className="toggle toggle-secondary ms-3 sm:ms-0 sm:order-1"
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
                className="input  w-full bg-white h-[38px] focus:bg-opacity-90 rounded-sm "
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
                onChange={handleCategoryChange}
                options={categories}
                value={selectedCategory?.value}
                placeholder="Select or type..."
                getNewOptionData={(inputValue, optionLabel) => ({
                  label: optionLabel,
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
