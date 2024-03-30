import { createBook } from "../../APICalls/createBook";
import { checkIfBookExists } from "../../APICalls/checkIfBookExists";
import { addToRead } from "../../APICalls/addToRead";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const AddToReadBtn = (props) => {
  const book = props.book;
  const book_id = props.id;
  const { user } = useContext(UserContext);
  const user_id = user.user_id;

  return (
    <button
      onClick={(e) => {
        handleAddToRead(book, book_id, user_id);
      }}
    >
      Add To Read
    </button>
  );
};

async function handleAddToRead(book, book_id, user_id) {
  const bookExists = await checkIfBookExists(book_id);

  if (bookExists) {
    await addToRead(user_id, book_id);
  } else {
    await createBook(book, book_id);
    await addToRead(user_id, book_id);
  }
}
