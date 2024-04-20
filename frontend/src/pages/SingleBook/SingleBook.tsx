import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import RatingStars from "../../components/RatingStars.tsx";

import ReviewForm from "./ReviewForm.tsx";
import Modal from "../../components/Modal.tsx";
import UserReviews from "./UserReviews.tsx";
import { ButtonGroup } from "./BtnGroup.tsx";
import { VolumeInfoType } from "../../types.ts";
import Recommendations from "./Recommendations.tsx";

interface ApiResponse {
  data: {
    volumeInfo: VolumeInfoType;
  };
  loading: boolean;
  error: boolean;
}
const SingleBook = () => {
  const { id } = useParams();
  const bookURL = `${
    import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API
  }volumes/${id}`;

  // Fetch book data
  const { data, loading, error } = useFetch<ApiResponse>(bookURL);

  const book: VolumeInfoType | undefined = data?.volumeInfo;
  // console.log(data);

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
          <section className="md:grid grid-flow-col grid-cols-6 gap-10 mt-10 space-y-5">
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

          <div className="md:grid grid-flow-col grid-cols-6 gap-10 my-10 ">
            {/* CTA btn group for user interactions */}
            <ButtonGroup bookData={data} onOpen={() => setModalOpen(true)} />
            {/* Right side with book description */}
            <div
              className="text-lg max-h-[500px] overflow-scroll col-span-4 w-full mt-5 md:mt-0"
              dangerouslySetInnerHTML={{ __html: book.description }}
            ></div>
          </div>

          {/* User Reviws */}
          <UserReviews book_id={id} />
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
