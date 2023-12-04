import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import BookCard from "./BookCard";

type Inputs = {
  title: string;
};

const BookSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    searchBook(data);
    console.log(searchResults);
  };

  async function searchBook(data) {
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${data.title}`;
    try {
      const result = await fetch(URL);
      const json = await result.json();

      if (json) {
        setSearchResults(json.items);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="my-10 items-center flex flex-col mx-5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-96">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered input-secondary w-full bg-transparent"
          {...register("title", {
            required: "Type your search keyword",
            minLength: { value: 3, message: "Minimum 3 charactors" },
          })}
        />
        {/* <input type="submit" className="btn btn-primary" /> */}
      </form>

      <div className="mx-auto ">
        {searchResults?.length ? (
          <div className="grid gap-10 mx-auto my-5 grid-cols-2 max-w-6xl">
            {searchResults.map((item) => (
              <BookCard key={item.id} data={item.volumeInfo} id={item.id} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default BookSearch;