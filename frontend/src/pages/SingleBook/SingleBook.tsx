import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import RatingStars from "../../components/RatingStars.tsx";
import { AddToReadBtn } from "./AddToReadBtn.tsx";
import ReviewForm from "./ReviewForm.tsx";
import Modal from "../../components/Modal.tsx";
import UserReviews from "./UserReviews.tsx";

const SingleBook = () => {
  const { id } = useParams();
  const bookURL = `${
    import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API
  }volumes/${id}`;

  // Fetch book data
  const { data, loading, error } = useFetch(bookURL);

  // console.log(data);

  const book = data?.volumeInfo;
  const saleInfo = data?.saleInfo;

  // const [setReviewUpdated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleReviewPosted: () => void = () => {
    setModalOpen(false);
  };

  return (
    <main className="px-5 my-10 container mx-auto max-w-screen-md lg:max-w-[1024px]">
      {loading && <p className="loading-spinner">Loading...</p>}
      {error && <h1>Failed to load page :-/</h1>}
      {book && (
        <div className="">
          {/* Top : Book overview */}
          <section className="grid grid-flow-col grid-cols-6 gap-10 mt-10">
            <div className="col-span-2">
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
            <div className="flex flex-col gap-5 col-span-4">
              <h1 className="text-4xl sm:text-5xl font-bold">{book.title}</h1>
              {book.subtitle && (
                <h2 className="text-xl md:text-2xl font-light mt-3 ">
                  {book.subtitle}
                </h2>
              )}
              {/* Meta data */}
              <div className="flex flex-col gap-2">
                {/* Authors */}
                <ul className="author-list flex gap-2 text-orange-300 text-lg">
                  {book.authors?.map((author: string) => (
                    <li key={author} className="">
                      {author}
                    </li>
                  ))}
                </ul>
                {book.averageRating && (
                  <RatingStars rating={book.averageRating} />
                )}
                {book.categories && <p className="">{book.categories[0]}</p>}

                <div className="flex divide-x-2 divide-gray-500 gap-2">
                  <p>{book.publishedDate ? book.publishedDate : "N/A"}</p>
                  {book.publisher && <p className="pl-2"> {book.publisher}</p>}
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-flow-col grid-cols-6 gap-10 mt-10">
            {/* Actions */}
            <section className="gap-4 col-span-2 space-y-5">
              <button
                onClick={() => setModalOpen(true)}
                className="btn btn-accent block w-full"
              >
                Review This Book
              </button>
              <AddToReadBtn book={book} id={id} />
              {saleInfo.saleability == "FREE" && (
                <div className="">
                  <a
                    href={saleInfo.buyLink}
                    className="btn btn-outline w-full align-middle flex"
                  >
                    READ FREE*
                  </a>
                  <p>*Jump to Google play. Required Google sign-in</p>
                </div>
              )}
            </section>
            {/* Right side with book description */}
            <div
              className="text-lg max-h-[500px] overflow-scroll col-span-4 w-full"
              dangerouslySetInnerHTML={{ __html: book.description }}
            ></div>
          </div>

          {/* User Reviws */}
          <UserReviews book_id={id} />
          {/* Review Modal */}
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <ReviewForm data={data} onReviewPosted={handleReviewPosted} />
          </Modal>
        </div>
      )}
    </main>
  );
};

export default SingleBook;
