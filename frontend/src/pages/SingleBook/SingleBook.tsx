import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import ReviewForm from "./ReviewForm.tsx";
import { useState } from "react";
import RatingStars from "../../components/RatingStars.tsx";
import { GoogleBookDataType } from "../../types.ts";
import { AddToReadBtn } from "./AddToReadBtn.tsx";
import Modal from "../../components/Modal.tsx";

const URL = import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API;

interface GoogleBookData {
  volumeInfo: GoogleBookDataType;
}

const SingleBook = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch<GoogleBookData>(
    `${URL}volumes/${id}`
  );
  const book = data?.volumeInfo;
  const [setReviewUpdated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  console.log(data);

  const handleReviewPosted: () => void = () => {
    // Update the state to trigger a re-render
    setReviewUpdated((prev) => !prev);
  };
  return (
    <main className="">
      <button
        className="underline mb-5 hover:bg-slate-500 hover:text-slate-100 px-2 rounded-lg"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load page...</p>}
      {book && (
        <div className="container mx-auto max-w-screen-2xl" id="container">
          <div className="my-10 text-center">
            <h1 className="text-3xl md:text-6xl font-bold ">{book.title}</h1>
            {book.subtitle && (
              <h2 className="text-xl md:text-2xl font-light mt-2 ">
                {book.subtitle}
              </h2>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Left side with image */}
            <div className="col-span-1">
              {/* Categories, Published Date, Publisher, and Average Rating */}

              <div className="flex my-5 gap-5">
                <img
                  className="max-w-full h-auto"
                  alt={`book cover of ${book.title}`}
                  src={
                    book.imageLinks?.thumbnail
                      ? book.imageLinks.thumbnail
                      : "/night.jpg"
                  }
                />

                <div>
                  {/* Authors */}
                  <ul className="flex flex-wrap gap-2 mt-4">
                    By
                    {book.authors?.map((author: string) => (
                      <li key={author} className="px-4 py-1 text-sm">
                        {author}
                      </li>
                    ))}
                  </ul>
                  {book.averageRating && (
                    <p className="mt-4">
                      Average Rating:{" "}
                      <RatingStars rating={book.averageRating} />
                    </p>
                  )}
                  {book.categories?.length > 0 && (
                    <p className="mt-2">{book.categories[0]}</p>
                  )}
                  <div className="mt-2">
                    <p>
                      Published:{" "}
                      {book.publishedDate ? book.publishedDate : "N/A"}
                    </p>
                    {book.publisher && (
                      <p className="mt-2">Publisher: {book.publisher}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-success"
                >
                  Write a review
                </button>
                <AddToReadBtn book={book} id={id} />
              </div>
            </div>

            {/* Right side with book details */}

            <div
              className=""
              dangerouslySetInnerHTML={{ __html: book.description }}
            ></div>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <ReviewForm data={data} onReviewPosted={handleReviewPosted} />
          </Modal>
        </div>
      )}
    </main>
  );
};

export default SingleBook;
