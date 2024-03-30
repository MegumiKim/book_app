import { useState } from "react";
import RatingForm from "./RatingForm";
import { GoogleBookDataType } from "../../types";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.tsx";
import { BASE_URL } from "../../utils/constant.ts";
import { postAPI } from "../../APICalls/postAPI.ts";

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
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [reviewDate, setReviewDate] = useState("");
  const [reviewText, setReviewText] = useState("");

  const reviewURL = BASE_URL + `reviews/user/${user.user_id}`;

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRating(Number(event.target.value));
  };

  const review = {
    google_book_id: book_id,
    status: "have read",
    review: reviewText,
    rating: selectedRating,
    read_date: reviewDate,
    title: book.title,
    author: book.authors?.[0],
    genre: book.categories?.[0],
    imageUrl: book.imageLinks?.thumbnail,
  };

  const submitReviewForm = async (body, e) => {
    e.preventDefault();
    postAPI(reviewURL, body);
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
        className="mx-auto max-w-xl flex flex-col gap-4"
        id="review-form"
      >
        <h3 className="font-bold text-lg mb-4">Write a review</h3>

        <RatingForm
          handleChange={handleRatingChange}
          selectedRating={selectedRating}
        />
        <div className="">
          <label htmlFor="date" className="me-9 text-sm font-bold">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={reviewDate}
            onChange={(e) => setReviewDate(e.target.value)}
            required
          />
        </div>
        <label htmlFor="review" className="block text-sm font-bold">
          Review Text
          <textarea
            id="review"
            className="w-full border rounded-md p-2 h-40 mt-4"
            placeholder="Summary / Key take-away / Quotes etc..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </label>

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
