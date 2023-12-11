import MyPageCard from "./MyPageCard";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { MyBookType, BookDataType } from "../../types";
import Tabs from "./Tabs";

const MyPage = () => {
  // const apiURL = "http://localhost:5000/books";
  const apiURL = "https://book-share-app.onrender.com/books";
  const { data, loading, error } = useFetch(apiURL);
  const myBooks = data?.data || [];
  const [booksToDisplay, setBooksToDisplay] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [userFeedback, setUserFeedback] = useState("");

  useEffect(() => {
    setBooksToDisplay(myBooks);
    setUserFeedback("");
  }, [data]);

  const booksToRead = myBooks.filter(
    (book: BookDataType) => book.status === "to-read"
  );
  const booksHaveRead = myBooks.filter(
    (book: BookDataType) => book.status === "read"
  );

  async function updateBookList(title) {
    const res = await fetch(apiURL);
    const json = await res.json();

    if (res.ok) {
      setUserFeedback(`Removed "${title}" from bookshelf`);
      setBooksToDisplay(json?.data || []);
    }
  }

  function onSelectTab(value) {
    setSelectedTab(value);
    setBooksToDisplay(
      value === "all"
        ? myBooks
        : value === "to-read"
        ? booksToRead
        : booksHaveRead
    );
  }

  const tabs = [
    { value: "all", label: "All", count: myBooks.length },
    { value: "to-read", label: "To Read", count: booksToRead.length },
    { value: "have-read", label: "Have Read", count: booksHaveRead.length },
  ];

  const clearShelf = async () => {
    // const res = await fetch("http://localhost:5000/books", {
    const res = await fetch("https://book-share-app.onrender.com/books", {
      method: "DELETE",
    });
    console.log(res);
  };
  return (
    <main className="text-slate-200 ">
      <div id="background3"></div>
      <div className="max-w-6xl self-center w-full m-auto mt-28 px-4">
        <div className="sm:flex gap-5 align-middle my-5">
          <h1 className="text-3xl ">Book Shelf</h1>
          <p className="text-red-400">{userFeedback}</p>
          {/* <button className="btn btn-primary" onClick={clearShelf}>
            Clear Bookshelf
          </button> */}
        </div>
        {loading && <div>Loading...</div>}
        {error && (
          <div className="text-red-400 text-xl">Failed to fetch data :-/</div>
        )}
        <Tabs onSelectTab={onSelectTab} selectedTab={selectedTab} tabs={tabs} />
        <div className="grid gap-10 mx-auto my-5 sm:grid-cols-2 ">
          {booksToDisplay?.length ? (
            booksToDisplay.map((book: BookDataType) => (
              // <p>hi</p>
              <MyPageCard
                key={book._id}
                data={book}
                onRemove={(book) => updateBookList(book)}
              />
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyPage;
