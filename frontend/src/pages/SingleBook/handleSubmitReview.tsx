import { checkIfBookExists } from "../../APICalls/checkIfBookExists.ts";
import { createBook } from "../../APICalls/createBook.ts";
import { postReview } from "../../APICalls/postReview.ts";
export const handleSubmitReview = async (
  user_input,
  book,
  book_ID,
  rating,
  e
) => {
  e.preventDefault();
  const userID = "3";

  const bookExists = await checkIfBookExists(book_ID);

  if (bookExists) {
    await postReview(userID, book_ID, user_input, rating);
  } else {
    await createBook(book, book_ID);
    await postReview(userID, book_ID, user_input, rating);
  }

  e.target.reset();
  document.getElementById("closeBtn")?.click();
};
