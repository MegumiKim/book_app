import { useEffect, useState } from "react";
import BookSearch from "./BookSearch";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  async function getAllBooks() {
    try {
      const books = await fetch("https://book-share-app.onrender.com/books");
      const json = await books.json();

      setBooks(json.data);
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit() {
    console.log("submit");
  }

  return (
    <main className="">
      <div id="background"></div>
      <div className="container m-auto mt-20 p-4 text-slate-100">
        <h1 className="text-center text-5xl my-5 max-w-xl m-auto">
          Make your reading permanent and personal
        </h1>
      </div>
      <BookSearch onSubmit={onSubmit} />
    </main>
  );
};

export default Home;
