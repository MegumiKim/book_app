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
  const bookShelfURL = BASE_URL + "reviews/user/" + id;
  const { data, loading, error } = useFetch(bookShelfURL);
  // const {myBooks, setMyBooks} = useContext(MYS)

  useEffect(() => {
    setBookShelf(data?.data);
  }, [data]);

  const handleDeleteAccount = async () => {
    await deleteUserAccount(user.user_id, setUser, navigate);
  };

  return (
    <main className="container">
      <div className="sm:flex justify-between">
        <button
          className="btn mb-5 hover:bg-slate-500 hover:text-slate-100 btn-outline btn-xs"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h2 className="text-lg">Welcome Back {user.name}!</h2>
      </div>
      <h1 className="mb-5">Book shelf ({bookShelf?.length}) </h1>

      {loading && (
        <div className="w-full justify-center flex flex-col gap-4 mb-10">
          <p className="m-auto">Loading...</p>
          <span className="m-auto loading loading-spinner text-secondary"></span>
        </div>
      )}
      {error && (
        <div className="text-red-400 text-xl">Failed to fetch data :-/</div>
      )}

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

      {id !== "1" && (
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-link text-lg w-full text-center my-10"
        >
          Delete Account
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Are you sure you want to delete account?</h2>
        <div className="flex gap-5 my-5 ">
          <button
            onClick={() => setModalOpen(false)}
            className="btn btn-warning"
          >
            Cancel
          </button>
          <button onClick={handleDeleteAccount} className="btn btn-outline">
            Yes, I want to delete
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default MyShelf;
