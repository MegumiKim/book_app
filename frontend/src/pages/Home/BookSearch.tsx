import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  author: string;
  category: string;
  free: boolean;
  onlyBooks: boolean;
  latest: boolean;
};

interface BookSearchProps {
  handleSearch: (result: []) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ handleSearch }) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    searchBook(data);
  };

  async function searchBook(data: Inputs) {
    const titleQuery = data.title ? data.title.trim() : "";
    const authorQuery = data.author ? `+inauthor:${data.author.trim()}` : "";
    const categoryQuery = data.category
      ? `+insubject:${data.category.trim()}`
      : "";
    const freeQuery = data.free ? "&filter=free-ebooks" : "";
    const onlyBookQuery = data.onlyBooks ? "&printType=books" : "";
    const latestQuery = data.latest ? "&orderBy=newest" : "";

    const URL =
      `https://www.googleapis.com/books/v1/volumes?q=` +
      titleQuery +
      authorQuery +
      categoryQuery +
      freeQuery +
      onlyBookQuery +
      latestQuery;

    try {
      const result = await fetch(URL);
      const json = await result.json();
      console.log(URL, result);

      if (json) {
        // setSearchResults(json.items);
        handleSearch(json.items);
        reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      setError("Failed to fetch books");
      console.error(error);
    }
  }

  function handleToggle() {
    setShowAdvancedSearch(!showAdvancedSearch);
  }
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };
  return (
    <section className="my-10 items-center flex flex-col mx-5 text-slate-200 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 bg-slate-800 p-4 sm:p-6 bg-opacity-80 rounded-lg w-full sm:w-[550px]"
      >
        <p>{error}</p>
        <input
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="search..."
          className="input input-bordered input-secondary w-full bg-transparent focus:bg-opacity-90 focus:bg-slate-700 text-slate-200"
          {...register("title")}
        />
        <div className="form-control">
          <label className="cursor-pointer flex self-end">
            <span className=" text-slate-200 label-text">
              Show Advanced Search
            </span>
            <input
              type="checkbox"
              className="toggle toggle-secondary ms-3"
              onChange={handleToggle}
            />
          </label>
        </div>

        {showAdvancedSearch && (
          <fieldset className=" flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                className="input input-bordered input-secondary w-full bg-transparent focus:bg-opacity-90 focus:bg-slate-700 text-slate-200"
                {...register("author")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Category / Subject</label>
              <input
                type="text"
                className="input input-bordered input-secondary w-full bg-transparent focus:bg-opacity-90 focus:bg-slate-700 text-slate-200"
                {...register("category")}
              />
            </div>
            <div className="sm:flex gap-10">
              <div className="flex gap-4">
                <label htmlFor="checkbox">Free ebook</label>
                <input
                  id="free_ebook"
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  {...register("free")}
                />
              </div>
              <div className="flex gap-4">
                <label htmlFor="checkbox">Exclude magazines</label>
                <input
                  id="only_books"
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  {...register("onlyBooks")}
                />
              </div>
              <div className="flex gap-4">
                <label htmlFor="checkbox">Latest</label>
                <input
                  id="latest"
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  {...register("latest")}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-secondary bg-opacity-75 text-slate-200 mt-8"
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
