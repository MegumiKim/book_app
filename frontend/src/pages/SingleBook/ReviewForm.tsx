import { FormEvent, useState } from "react";
import RatingForm from "./RatingForm";
import { GoogleBookDataType } from "../../types";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.tsx";
import { BASE_URL } from "../../utils/constant.ts";
import { postAPI } from "../../APICalls/postAPI.ts";
import { reviewDataType } from "./SingleBook.tsx";

const ReviewForm = (props: {
  data: GoogleBookDataType;
  onReviewPosted: (newReview: reviewDataType) => void;
}) => {
  const book = props.data.volumeInfo;
  const book_id = props.data.id;
  const { user } = useContext(UserContext);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const onReviewPosted = props.onReviewPosted;
  const reviewURL = BASE_URL + `reviews/user/${user.user_id}`;

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRating(Number(event.target.value));
  };

  const review = {
    google_book_id: book_id,
    status: "have read",
    // name: user.name,
    review: reviewText,
    rating: selectedRating,
    title: book.title,
    author: book.authors?.[0],
    genre: book.categories?.[0],
    imageUrl: book.imageLinks?.thumbnail,
  };

  const submitReviewForm = async (
    body: {
      google_book_id: string | undefined;
      status: string | undefined;
      review?: string;
      rating?: number | null;
      name?: string | undefined;
      user_id?: number | null | undefined;
      title: string | undefined;
      author: string | undefined;
      genre: string | undefined;
      username?: string | undefined;
      imageurl?: string | undefined;
    },
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const response = await postAPI(reviewURL, body);

    onReviewPosted(response.data);
  };

  return (
    <form
      onSubmit={(e) => submitReviewForm(review, e)}
      className="mx-auto max-w-xl flex flex-col gap-4 review-form"
    >
      <h3 className="font-bold text-2xl mb-4">Write a review</h3>

      <RatingForm
        handleChange={handleRatingChange}
        selectedRating={selectedRating}
      />
      <label htmlFor="review" className="block text-sm font-bold">
        Review Text
        <textarea
          id="review"
          className="w-full border rounded-md p-2 h-40 sm:h-80 mt-4"
          placeholder="Summary / Key take-away / Quotes etc..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </label>
      <div className="mb-4">
        <button type="submit" className="btn btn-success">
          Post
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
