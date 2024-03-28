import { BASE_URL } from "../utils/constant";
import { postAPI } from "./postAPI";

export const addToRead = async (user_ID, book_ID) => {
  const reviewURL = BASE_URL + `reviews/user/${user_ID}`;
  const reviewBody = {
    google_book_id: book_ID,
    status: "to read",
  };
  postAPI(reviewURL, reviewBody);
};
