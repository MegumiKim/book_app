import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import ReviewForm from "./ReviewForm.tsx";
import MyReview from "./MyReview.tsx";
import { useState } from "react";
import AddToRead from "./AddToRead.tsx";
import RatingStars from "../../components/RatingStars.tsx";
import { GoogleBookDataType } from "../../types.ts";
import { AddToReadBtn } from "./AddToReadBtn.tsx";

const URL = import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API;

interface GoogleBookData {
  volumeInfo: GoogleBookDataType;
}

const SingleBook = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch<GoogleBookData>(
    `${URL}volumes/${id}`
  );
  const [userFeedback, setUserFeedback] = useState<string>("");
  const [reviewUpdated, setReviewUpdated] = useState(false);

  // console.log(data);

  const book = data?.volumeInfo;

  const navigate = useNavigate();

  const updateUserFeedback = (feedback: string) => {
    setUserFeedback(feedback);
  };

  const handleReviewPosted: () => void = () => {
    // Update the state to trigger a re-render
    setReviewUpdated((prev) => !prev);
  };
  return (
    <main className="">
      <div id="background2"></div>
      <div className="max-w-6xl p-4 mx-auto bg-slate-700 bg-opacity-80 text-slate-100 rounded-md">
        <button
          className="underline mb-5 hover:bg-slate-500 hover:text-slate-100 px-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Failed to load page...</p>}
        {book && (
          <div
            className="container mx-auto px-4 max-w-screen-xl"
            id="container"
          >
            <div className=" sm:grid grid-flow-col gap-3 grid-cols-3">
              <div className="left col-span-1">
                <img
                  className="m-auto max-w-[250px]"
                  alt=""
                  src={
                    book.imageLinks?.thumbnail
                      ? book.imageLinks.thumbnail
                      : "/night.jpg"
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
                    {book.averageRating && (
                      <RatingStars rating={book.averageRating} />
                    )}
                    <div className="my-5 flex gap-4">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          (
                            document.getElementById(
                              "my_modal_2"
                            ) as HTMLDialogElement
                          ).showModal();
                        }}
                      >
                        Write a review
                      </button>
                      <AddToReadBtn book={book} id={id} />
                      {/* <AddToRead
                        data={data}
                        id={id}
                        updateUserFeedback={updateUserFeedback}
                      /> */}
                    </div>
                    <p className="text-green-400">{userFeedback}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:grid grid-flow-col gap-3 grid-cols-3 mb-10">
              <ul className="col-span-1 mx-auto my-5">
                {book.categories?.map((category: string) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
              <div className="col-span-2 ">
                <div
                  className="leading-7"
                  dangerouslySetInnerHTML={{ __html: book.description }}
                ></div>
                {/* <MyReview id={id} reviewUpdated={reviewUpdated} /> */}
              </div>
            </div>

            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <ReviewForm data={data} onReviewPosted={handleReviewPosted} />
              </div>
            </dialog>
          </div>
        )}
      </div>
    </main>
  );
};

export default SingleBook;
