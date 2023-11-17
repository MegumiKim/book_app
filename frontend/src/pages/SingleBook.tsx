import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewModal";

const URL = import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API;

const SingleBook = () => {
  const [book, setBook] = useState({});
  let { id } = useParams();

  async function getBook() {
    try {
      const data = await fetch(`${URL}volumes/${id}`);
      const json = await data.json();
      console.log(json.volumeInfo);
      console.log(json.volumeInfo.imageLinks.small);
      if (json) {
        setBook(json.volumeInfo);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBook();
  }, []);

  function onSubmit() {
    console.log("submit");
  }

  return (
    <main>
      {book && (
        <div>
          <h1 className="text-5xl">{book.title}</h1>
          <p>
            <ul>
              {book.categories?.map((category) => (
                <li>{category}</li>
              ))}
            </ul>
          </p>

          <ul>
            {book.authors?.map((author) => (
              <li>{author}</li>
            ))}
          </ul>

          <p>Published: {book.publishedDate ? book.publishedDate : ""}</p>
          <p>Rating: {book.averageRating}</p>
          <p>{book.description}</p>

          <img alt="" src={book.imageLinks.thumbnail} />
        </div>
      )}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        White a review
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Write review</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
          <ReviewForm onSubmit={onSubmit} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </main>
  );
};

export default SingleBook;
