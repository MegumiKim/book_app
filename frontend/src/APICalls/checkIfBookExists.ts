import { BASE_URL } from "../utils/constant";

export async function checkIfBookExists(book_ID: string) {
  const getBookURL = BASE_URL + `books/${book_ID}`;

  // Check if the book exists
  const response = await fetch(getBookURL);

  if (response.ok) {
    // console.log(json);
    return true;
  } else {
    console.error("Book Not found");
    return false;
  }
}
