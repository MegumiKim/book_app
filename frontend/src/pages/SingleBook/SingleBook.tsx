import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import RatingStars from "../../components/RatingStars.tsx";
import ReviewForm from "./ReviewForm.tsx";
import Modal from "../../components/Modal.tsx";
import UserReviews from "./UserReviews.tsx";
import { ButtonGroup } from "./BtnGroup.tsx";
import { GoogleBookDataType } from "../../types.ts";
import Recommendations from "./Recommendations.tsx";
import { BASE_URL } from "../../utils/constant.ts";

export interface reviewDataType {
  google_book_id: string | undefined;
  status: string | undefined;
  review?: string;
  rating?: number | null;
  name?: string | undefined;
  user_id?: number | null | undefined;
}

const SingleBook = () => {
  const { id } = useParams();
  const bookURL = `${
    import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API
  }volumes/${id}`;
  // Fetch book data
  const { data, loading, error } = useFetch<GoogleBookDataType>(bookURL);

  const book = data?.volumeInfo;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReviews();
  }, [id]);
  // const [setReviewUpdated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [reviews, setReviews] = useState<reviewDataType[]>([]);

  const fetchReviews = async () => {
    // Fetch reviews from your API
    const reviewsURL = `${BASE_URL}reviews/${id}`;
    try {
      const response = await fetch(reviewsURL);
      const data = await response.json();
      console.log(data);

      setReviews(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewPosted = async (newReview: reviewDataType) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setModalOpen(false);
  };

  return (
    <main className="px-5 container mx-auto max-w-screen-md lg:max-w-[1024px]">
      {loading && <p className="loading-spinner">Loading...</p>}
      {error && <h1>Failed to load page :-/</h1>}
      {book && (
        <div className="">
          {/* Top : Book overview */}
          <section
            className="md:grid grid-flow-col grid-cols-6 gap-10 space-y-5 md:space-y-0"
            id="page-top"
          >
            <figure className="col-span-2 w-[180px] m-auto">
              <img
                className="object-cover "
                alt={`book cover of ${book.title}`}
                src={
                  book.imageLinks?.thumbnail
                    ? book.imageLinks.thumbnail
                    : "/night.jpg"
                }
              />
            </figure>

            <div className="flex flex-col gap-5 col-span-4 text-center md:text-start">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold line-clamp-3 ">
                {book.title}
              </h1>
              {book.subtitle && (
                <h2 className="text-xl md:text-2xl font-light mt-3 ">
                  {book.subtitle}
                </h2>
              )}
              {/* Meta data */}
              <div className="flex flex-col gap-2 mx-auto md:mx-0 text-center md:text-start">
                {/* Authors */}
                <ul className="author-list flex gap-2 text-orange-300 text-lg m-auto md:m-0">
                  {book.authors?.map((author: string) => (
                    <li key={author} className="">
                      {author}
                    </li>
                  ))}
                </ul>
                {book.averageRating && (
                  <div>
                    <RatingStars rating={book.averageRating} />
                  </div>
                )}
                {book.categories && <p className="">{book.categories[0]}</p>}

                <div className="md:flex md:divide-x-2 divide-gray-500 gap-2">
                  <p>{book.publishedDate ? book.publishedDate : "N/A"}</p>
                  {book.publisher && <p className="pl-2"> {book.publisher}</p>}
                </div>
              </div>
            </div>
          </section>

          <div className="md:grid grid-flow-col grid-cols-6 gap-10 my-10 ">
            {/* CTA btn group for user interactions */}
            <ButtonGroup bookData={data} onOpen={() => setModalOpen(true)} />
            {/* Right side with book description */}
            <div
              className="text-lg max-h-[500px] overflow-scroll col-span-4 w-full mt-5 md:mt-0"
              dangerouslySetInnerHTML={{ __html: book.description || "" }}
            ></div>
          </div>

          {/* User Reviws */}
          <UserReviews reviews={reviews} />
          {/* Review Modal */}
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <ReviewForm data={data} onReviewPosted={handleReviewPosted} />
          </Modal>
          {book.categories && (
            <Recommendations genre={book.categories[0]} id={id} />
          )}
        </div>
      )}
    </main>
  );
};

export default SingleBook;
