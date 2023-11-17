import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import BookSearch from "./BookSearch";

const BookList = () => {
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
    <main>
      {/* {books.length ? (
        books.map((book) => <BookCard key={book.id} data={book} />)
      ) : (
        <div>NO item</div>
      )} */}

      <BookSearch onSubmit={onSubmit} />
    </main>
  );
};

export default BookList;
