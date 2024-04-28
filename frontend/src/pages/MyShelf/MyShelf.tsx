import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../utils/constant";
import BookCard from "../../components/BookCard";
import { deleteUserAccount } from "../../APICalls/DeleteAccount";
import Modal from "../../components/Modal";

const MyShelf = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const [bookShelf, setBookShelf] = useState([]);
  const [toReadShelf, setToReadShelf] = useState([]);
  const [haveReadShelf, setHaveReadShelf] = useState([]);
  const [selectedTab, setSelectedTab] = useState("toRead");

  const bookShelfURL = BASE_URL + "reviews/user/" + id;
  const { data, loading, error } = useFetch(bookShelfURL);
  // const {myBooks, setMyBooks} = useContext(MYS)

  useEffect(() => {
    const toReads = data?.data.filter((item) => item.status == "to read");
    const haveReads = data?.data.filter((item) => item.status == "have read");

    setBookShelf(toReads);
    setToReadShelf(toReads);
    setHaveReadShelf(haveReads);
  }, [data]);

  function toggleBookShelf(e) {
    const shelf = e.target.dataset.shelf;

    if (shelf === "toReads") {
      setBookShelf(toReadShelf);
      setSelectedTab("toRead");
    } else if (shelf === "haveReads") {
      setBookShelf(haveReadShelf);
      setSelectedTab("haveReads");
    }
  }

  const handleDeleteAccount = async () => {
    await deleteUserAccount(user.user_id, setUser, navigate);
  };

  return (
    <main className="">
      <div className="sm:flex justify-between">
        {/* <button
          className="btn mb-5 hover:bg-slate-500 hover:text-slate-100 btn-outline btn-xs"
          onClick={() => navigate(-1)}
        >
          Back
        </button> */}
      </div>
      <div className="flex justify-between">
        <h2 className="text-lg">Welcome Back {user.name}!</h2>
        {/* <Feed /> */}
      </div>
      <h1 className="mb-5">Book shelf ({data?.data.length}) </h1>

      {loading && (
        <div className="w-full justify-center flex flex-col gap-4 mb-10">
          <p className="m-auto">Loading...</p>
          <span className="m-auto loading loading-spinner text-secondary"></span>
        </div>
      )}
      {error && (
        <div className="text-red-400 text-xl">Failed to fetch data :-/</div>
      )}

      <div role="tablist" className="tabs tabs-bordered mb-10 ">
        <button
          className={`tab hover:bg-slate-700 h-10 ${
            selectedTab === "toRead" && "tab-active"
          }`}
          onClick={toggleBookShelf}
          data-shelf="toReads"
        >
          To Read <span>({toReadShelf?.length})</span>
        </button>
        <button
          className={`tab hover:bg-slate-700 h-10 ${
            selectedTab === "haveReads" && "tab-active"
          }`}
          onClick={toggleBookShelf}
          data-shelf="haveReads"
        >
          Have Read <span>({haveReadShelf?.length})</span>
        </button>
      </div>
      {/* <div>{shelfToBeDisplayed}</div> */}
      <div className="bookshelf">
        {bookShelf?.length
          ? bookShelf.map((book) => (
              <BookCard
                id={book.google_book_id}
                title={book.title}
                author={book.author}
                status={book.status}
                genre={book.genre}
                thumbnail={book.imageurl}
                key={book.google_book_id}
                created_at={book.created_at}
              />
            ))
          : "No book is added in your bookshelf"}
      </div>
    </main>
  );
};

export default MyShelf;
