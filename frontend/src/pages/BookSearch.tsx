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
    try {
      const result = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${data.title}`
      );
      const json = await result.json();
      console.log(json);

      if (json) {
        setSearchResults(json.items);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="War and Peace"
          className="input input-bordered input-secondary w-full max-w-xs"
          {...register("title", {
            required: "Type your search keyword",
            minLength: { value: 3, message: "Minimum 3 charactors" },
          })}
        />
        <input type="submit" className="btn btn-primary" />
      </form>

      <div>
        {searchResults?.length && (
          <div className="grid gap-4">
            {searchResults.map((item) => (
              <BookCard key={item.id} data={item.volumeInfo} id={item.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSearch;
