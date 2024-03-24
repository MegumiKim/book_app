// import MyPageCard from "./MyPageCard";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
// import { SetStateAction, useEffect, useState } from "react";
// import { BookDataType } from "../../types";

import { useParams } from "react-router-dom";
import BookCard from "./BookCard";

// import Tabs from "./Tabs";
interface UserType {
  name: string;
  id: number;
}
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const ReadBooks = () => {
  const { id } = useParams();
  const reviewURL = BASE_URL + "reviews/user/" + id;

  const { data, loading, error } = useFetch(reviewURL);
  const currentBooks = data?.data || {};

  const [readBooks, setReadBooks] = useState([]);
  useEffect(() => {
    setReadBooks(currentBooks);
  }, [data]);

  return (
    <main className="container">
      <h2>Read Books</h2>
      {loading && (
        <div className="w-full justify-center flex flex-col gap-4 mb-10">
          <p className="m-auto">Loading...</p>
          <span className="m-auto loading loading-spinner text-secondary"></span>
        </div>
      )}
      {error && (
        <div className="text-red-400 text-xl">Failed to fetch data :-/</div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {readBooks.length
          ? readBooks.map((book, i) => <BookCard book={book} key={i} />)
          : "no books"}
      </div>
    </main>
  );
};

export default ReadBooks;
