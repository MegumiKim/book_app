import { BASE_URL } from "../utils/constant";
import { postAPI } from "./postAPI";

export const postReview = async (user_ID, book_ID, user_input, rating) => {
  const reviewURL = BASE_URL + `reviews/user/${user_ID}`;
  const reviewBody = {
    google_book_id: book_ID,
    status: "have read",
    review: user_input.review,
    rating: rating,
    read_date: "2023-01-15",
  };
  postAPI(reviewURL, reviewBody);
};
