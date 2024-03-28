// ReviewForm.js
import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
import RatingForm from "./RatingForm";
import { GoogleBookDataType, MyBookType } from "../../types";
import { useContext } from "react";
import { UserContext } from "../../context/BookContext.tsx";
import { handleSubmitReview } from "./handleSubmitReview.tsx";
import { BASE_URL } from "../../utils/constant.ts";
import { postAPI } from "../../APICalls/postAPI.ts";
import { createBook } from "../../APICalls/createBook.ts";
import { checkIfBookExists } from "../../APICalls/checkIfBookExists.ts";

interface GoogleBookData {
  volumeInfo: GoogleBookDataType;
  id?: "string";
}

const ReviewForm = (props: {
  data: GoogleBookData;
  onReviewPosted: () => void;
}) => {
  const book = props.data.volumeInfo;
  const book_id = props.data.id;
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const reviewURL = BASE_URL + `reviews/user/${user.user_id}`;

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const review = {
    google_book_id: book_id,
    status: "have read",
    review: reviewText,
    rating: rating,
    read_date: "2023-01-15",
  };
  const submitReviewForm = async (review, e) => {
    e.preventDefault();
    const bookExists = await checkIfBookExists(book_id);

    if (bookExists) {
      postAPI(reviewURL, review);
    }
    await createBook(book, book_id);
    postAPI(reviewURL, review);
    // console.log(review);
  };
  return (
    <main className="container ">
      <form method="dialog">
        <button
          id="closeBtn"
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2"
        >
          close
        </button>
      </form>
      <form
        onSubmit={(e) => submitReviewForm(review, e)}
        // onSubmit={(e) =>
        //   handleSubmit((data, e) =>
        //     handleSubmitReview(data, book, book_id, rating, e)
        //   )(e)
        // }
        className="mx-auto max-w-xl"
        id="review-form"
      >
        <h3 className="font-bold text-lg mb-4">Write a review</h3>

        <RatingForm handleChange={handleRatingChange} />
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-bold mb-2">
            Review Text
          </label>
          <textarea
            id="review"
            // {...register("review", { required: "Review text is required" })}
            className="w-full border rounded-md p-2 h-40"
            placeholder="Summary / Key take-away / Quotes etc..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          {/* {errors.review && (
            <p className="text-red-500 text-xs mt-1">An Error occurred</p>
          )} */}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </form>
    </main>
  );
};

export default ReviewForm;
