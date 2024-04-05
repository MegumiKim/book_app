import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import { GoogleBookDataType } from "../../types.ts";
import RatingStars from "../../components/RatingStars.tsx";
import { AddToReadBtn } from "./AddToReadBtn.tsx";
import ReviewForm from "./ReviewForm.tsx";
import Modal from "../../components/Modal.tsx";

const URL = import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API;

interface GoogleBookData {
  volumeInfo: GoogleBookDataType;
  accessInfo: {
    pdf: {
      downloadLink: string;
    };
  };
}

const SingleBook = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch<GoogleBookData>(
    `${URL}volumes/${id}`
  );
  const book = data?.volumeInfo;
  const saleInfo = data?.saleInfo;
  // const [setReviewUpdated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleReviewPosted: () => void = () => {
    setModalOpen(false);
    // Update the state to trigger a re-render
    // setReviewUpdated((prev) => !prev);
  };

  return (
    <main>
      {loading && <p className="loading-spinner">Loading...</p>}
      {error && <h1>Failed to load page :-/</h1>}
      {book && (
        <div className="container mx-auto max-w-[600px] lg:max-w-screen-2xl">
          {/* Top : Title and subtitle */}
          <div className="my-10 sm:my-16 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold max-w-[800px] mx-auto">
              {book.title}
            </h1>
            {book.subtitle && (
              <h2 className="text-xl md:text-2xl font-light mt-5 ">
                {book.subtitle}
              </h2>
            )}
          </div>
          {/* Bottom: 2 columns part */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left side with image */}
            <div className="col-span-1">
              {/* Categories, Published Date, Publisher, and Average Rating */}
              <div className="flex flex-col sm:flex-row my-5 justify-around gap-5">
                <div className="flex">
                  <img
                    className="m-auto object-cover w-[180px]"
                    alt={`book cover of ${book.title}`}
                    src={
                      book.imageLinks?.thumbnail
                        ? book.imageLinks.thumbnail
                        : "/night.jpg"
                    }
                  />
                </div>

                <div className="divide-y-2 divide-gray-500 ">
                  {/* Authors */}
                  <ul className=" py-2 text-bold text-lg gap-2 ">
                    {book.authors?.map((author: string) => (
                      <li key={author} className="">
                        {author}
                      </li>
                    ))}
                  </ul>
                  {book.averageRating && (
                    <p className="py-2">
                      Average Rating:{" "}
                      <RatingStars rating={book.averageRating} />
                    </p>
                  )}
                  {book.categories && (
                    <p className="align-middle py-2">{book.categories[0]}</p>
                  )}
                  <div className="py-2">
                    <p>
                      Published:{" "}
                      {book.publishedDate ? book.publishedDate : "N/A"}
                    </p>
                    {book.publisher && <p>Publisher: {book.publisher}</p>}
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="mt-6 flex flex-col gap-4 justify-center flex-wrap max-w-xs">
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-accent flex-1"
                >
                  Review This Book
                </button>
                <AddToReadBtn book={book} id={id} />
                {saleInfo.saleability == "FREE" && (
                  <div className="">
                    <a
                      href={saleInfo.buyLink}
                      className="btn btn-primary w-full"
                    >
                      READ FREE
                    </a>
                    <p>Jump to Google play. Required Google sign-in</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right side with book details */}

            <div
              className="text-lg max-h-[500px] overflow-scroll"
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
