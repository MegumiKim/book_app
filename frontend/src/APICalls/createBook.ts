import { BASE_URL } from "../utils/constant";
import { postAPI } from "./postAPI";

// Function to handle book creation
export const createBook = async (book, book_ID) => {
  const createBookURL = BASE_URL + "books/";

  const bookBody = {
    google_book_id: book_ID,
    title: book.title || "Unknown Title", // Default title if missing
    author: (book.authors && book.authors[0]) || "Unknown Author", // Checks if authors exist and uses the first author, defaults to "Unknown Author"
    genre: (book.categories && book.categories[0]) || "Unknown Genre", // Checks if categories exist and uses the first category, defaults to "Unknown Genre"
    imageurl: (book.imageLinks.thumbnail && book.imageLinks.thumbnail) || "", // Checks if imageLinks exist and uses the thumbnail, defaults to empty string
  };

  postAPI(createBookURL, bookBody);
};
