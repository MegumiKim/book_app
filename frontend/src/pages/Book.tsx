import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";

const URL = import.meta.env.VITE_REACT_APP_API_URL;

const Book = () => {
  const [book, setBook] = useState({});
  let { id } = useParams();

  async function getBook() {
    try {
      const data = await fetch(`${URL}/books/${id}`);
      const json = await data.json();
      if (json) {
        setBook(json);
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
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Published: {book.yearPublished}</p>
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

export default Book;
