import { useParams, useNavigate, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.tsx";
import ReviewForm from "./ReviewForm.tsx";
import MyReview from "./MyReview.tsx";
import { useState } from "react";
import AddToRead from "./AddToRead.tsx";

const URL = import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API;

const SingleBook = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useFetch(`${URL}volumes/${id}`);
  const [userFeedback, setUserFeedback] = useState("");
  // const [showModal, setShowModal] = useState(false);
  const book = data?.volumeInfo;
  const navigate = useNavigate();

  const updateUserFeedback = (feedback) => {
    setUserFeedback(feedback);
  };

  return (
    <main className="px-4 max-w-6xl mx-auto">
      <button
        className="underline mb-5 hover:bg-slate-500 hover:text-slate-100 px-2 rounded-lg"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load page...</p>}
      {book && (
        <div className="container mx-auto px-4 max-w-screen-xl" id="container">
          <div className=" sm:grid grid-flow-col gap-3 grid-cols-3">
            <div className="left col-span-1">
              <img
                className="m-auto"
                alt=""
                src={
                  book.imageLinks
                    ? book.imageLinks.thumbnail
                    : "../../public/night.jpg"
                }
              />
            </div>
            <div className="right col-span-2">
              <div className="sm:flex justify-between">
                <div>
                  <h1 className="text-5xl">{book.title}</h1>
                  {book.subtitle && (
                    <h2 className="text-2xl">{` ${book.subtitle}`}</h2>
                  )}
                  <ul className="flex gap-5">
                    {book.authors?.map((author: string) => (
                      <li key={author}>{author}</li>
                    ))}
                  </ul>
                  <div className="flex gap-4">
                    <p>{book.publishedDate ? book.publishedDate : ""}</p>
                    {book.publisher && <p>{book.publisher}</p>}
                  </div>
                  {book.averageRating && <p>Rating: {book.averageRating}</p>}
                  <div className="my-5 flex gap-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        document.getElementById("my_modal_2").showModal();
                      }}
                    >
                      Write a review
                    </button>
                    <AddToRead
                      data={data}
                      id={id}
                      updateUserFeedback={updateUserFeedback}
                    />
                  </div>
                  <p className="text-green-400">{userFeedback}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:grid grid-flow-col gap-3 grid-cols-3">
            <ul className="col-span-1">
              {book.categories?.map((category: string) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
            <div
              className="my-8 col-span-2"
              dangerouslySetInnerHTML={{ __html: book.description }}
            ></div>
          </div>

          <MyReview id={id} />

          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <ReviewForm data={data} />
            </div>
          </dialog>
        </div>
      )}
    </main>
  );
};

export default SingleBook;