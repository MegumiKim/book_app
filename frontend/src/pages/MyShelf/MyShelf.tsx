import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../utils/constant";
import BookCard from "../../components/BookCard";

const MyShelf = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const bookShelfURL = BASE_URL + "reviews/user/" + id;

  const { data, loading, error } = useFetch(bookShelfURL);
  const [bookShelf, setBookShelf] = useState([]);

  useEffect(() => {
    setBookShelf(data?.data);
  }, [data]);

  // console.log(bookShelf);
  return (
    <main className="mx-5 max-w-6xl xl:mx-auto">
      <h2>Welcome Back {user.name}!</h2>
      <h1 className="text-4xl mb-5">Book shelf ({bookShelf?.length}) </h1>

      {loading && (
        <div className="w-full justify-center flex flex-col gap-4 mb-10">
          <p className="m-auto">Loading...</p>
          <span className="m-auto loading loading-spinner text-secondary"></span>
        </div>
      )}
      {error && (
        <div className="text-red-400 text-xl">Failed to fetch data :-/</div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {bookShelf?.length
          ? bookShelf.map((book) => (
              <BookCard
                id={book.google_book_id}
                title={book.title}
                status={book.status}
                genre={book.genre}
                thumbnail={book.imageurl}
                key={book.google_book_id}
              />
            ))
          : "No book is added in your bookshelf"}
      </div>
    </main>
  );
};
// const MyPage = () => {
//   // const apiURL = "http://localhost:5000/books";
//   const apiURL = "https://book-share-app.onrender.com/books";
//   const { data, loading, error } = useFetch<DataType>(apiURL);
//   // console.log(data);

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const myBooks = data?.data || [];
//   const [booksToDisplay, setBooksToDisplay] = useState([]);
//   const [selectedTab, setSelectedTab] = useState("all");
//   const [userFeedback, setUserFeedback] = useState("");

//   useEffect(() => {
//     setBooksToDisplay(myBooks);
//     setUserFeedback("");
//   }, [data]);

//   const booksToRead = myBooks.filter(
//     (book: BookDataType) => book.status === "to-read"
//   );
//   const booksHaveRead = myBooks.filter(
//     (book: BookDataType) => book.status === "read"
//   );

//   async function updateBookList(title: string) {
//     const res = await fetch(apiURL);
//     const json = await res.json();

//     if (res.ok) {
//       setUserFeedback(`Removed "${title}" from bookshelf`);
//       setBooksToDisplay(json?.data || []);
//     }
//   }

//   function onSelectTab(value: SetStateAction<string>) {
//     setSelectedTab(value);
//     setBooksToDisplay(
//       value === "all"
//         ? myBooks
//         : value === "to-read"
//         ? booksToRead
//         : booksHaveRead
//     );
//   }

//   const tabs = [
//     { value: "all", label: "All", count: myBooks.length },
//     { value: "to-read", label: "To Read", count: booksToRead.length },
//     { value: "have-read", label: "Have Read", count: booksHaveRead.length },
//   ];

//   // const clearShelf = async () => {
//   //   // const res = await fetch("http://localhost:5000/books", {
//   //   const res = await fetch("https://book-share-app.onrender.com/books", {
//   //     method: "DELETE",
//   //   });
//   //   console.log(res);
//   // };
//   return (
//     <h1>My Book Shelf</h1>
//     // <main className="text-slate-200 ">
//     //   <div id="background3"></div>
//     //   <div className="max-w-6xl self-center w-full m-auto mt-28 px-4">
//     //     <div className="sm:flex gap-5 align-middle my-5">
//     //       <h1 className="text-3xl ">Book Shelf</h1>
//     //       <p className="text-red-400">{userFeedback}</p>
//     //       {/* <button className="btn btn-primary" onClick={clearShelf}>
//     //         Clear Bookshelf
//     //       </button> */}
//     //     </div>

//     //     <Tabs onSelectTab={onSelectTab} selectedTab={selectedTab} tabs={tabs} />

//     //     {loading && (
//     //       <div className="w-full justify-center flex flex-col gap-4 mb-10">
//     //         <p className="m-auto">
//     //           Patience please...loading data in a moment.
//     //         </p>
//     //         <span className="m-auto loading loading-spinner text-secondary"></span>
//     //       </div>
//     //     )}
//     //     {error && (
//     //       <div className="text-red-400 text-xl">Failed to fetch data :-/</div>
//     //     )}

//     //     <div className="grid gap-10 mx-auto my-5 sm:grid-cols-2 ">
//     //       {booksToDisplay?.length
//     //         ? booksToDisplay.map((book: BookDataType) => (
//     //             <MyPageCard
//     //               key={book._id}
//     //               data={book}
//     //               onRemove={(book) => updateBookList(book)}
//     //             />
//     //           ))
//     //         : ""}
//     //       {!booksToDisplay?.length && !loading && <p>No Book in the shelf</p>}
//     //     </div>
//     //   </div>
//     // </main>
//   );
// };

export default MyShelf;
