import MyPageCard from "./MyPageCard";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { MyBookType } from "../../types";
import Tabs from "./Tabs";

const MyPage = () => {
  const apiURL = "http://localhost:5000/books";
  // "https://book-share-app.onrender.com/books"
  const { data, loading, error } = useFetch(apiURL);
  const myBooks = data?.data || [];
  const [booksToDisplay, setBooksToDisplay] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    setBooksToDisplay(myBooks);
  }, [data]);

  const booksToRead = myBooks.filter((book) => book.status === "to-read");
  const booksHaveRead = myBooks.filter((book) => book.status === "read");

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

  if (error) {
    return <div>Oops, Failed to fetch data :-/</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4 max-w-6xl m-auto">
      <h1 className="text-2xl my-5">My Book Shelf</h1>

      {/* <div role="tablist" className="tabs tabs-bordered">
        {["all", "to-read", "have-read"].map((tab) => (
          <button
            key={tab}
            value={tab}
            className={`tab ${selectedTab === tab && "tab-active"}`}
            onClick={(e) =>
              onSelectTab(
                e,
                tab === "all"
                  ? myBooks
                  : tab === "to-read"
                  ? booksToRead
                  : booksHaveRead
              )
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
            {booksToDisplay.length && `(${booksToDisplay.length})`}
          </button>
        ))}
      </div> */}
      <Tabs onSelectTab={onSelectTab} selectedTab={selectedTab} tabs={tabs} />

      <div className="grid gap-10 mx-auto my-5 sm:grid-cols-2 " id="toRead">
        {booksToDisplay.length ? (
          booksToDisplay.map((book) => (
            <MyPageCard key={book._id} data={book} />
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </main>
  );
};

export default MyPage;
