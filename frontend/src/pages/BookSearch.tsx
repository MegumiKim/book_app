import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import BookCard from "./BookCard";

type Inputs = {
  title: string;
};

const BookSearch = ({ handleSearch }) => {
  const [searchResults, setSearchResults] = useState([]);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    searchBook(data);
  };

  async function searchBook(data: { title: string }) {
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${data.title}`;
    try {
      const result = await fetch(URL);
      const json = await result.json();

      if (json) {
        // setSearchResults(json.items);
        handleSearch(json.items);
      } else {
        throw new Error();
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
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
        />
      </form>
    </section>
  );
};

export default BookSearch;
