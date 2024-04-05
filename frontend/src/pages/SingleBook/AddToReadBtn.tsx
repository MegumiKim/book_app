import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../utils/constant";
import { postAPI } from "../../APICalls/postAPI";

export const AddToReadBtn = (props) => {
  const book = props.book;
  const book_id = props.id;
  const { user } = useContext(UserContext);
  const user_id = user.user_id;
  const URL = BASE_URL + `reviews/user/${user_id}`;

  const body = {
    google_book_id: book_id,
    status: "to read",
    title: book.title,
    author: book.authors?.[0],
    genre: book.categories?.[0],
    imageUrl: book.imageLinks?.thumbnail,
  };

  async function addToRead(e) {
    postAPI(URL, body);
    e.target.innerHTML = "Added to my shelf";
  }

  return (
    <button
      className="btn btn-info flex-1"
      onClick={(e) => {
        addToRead(e);
      }}
    >
      Add To Read
    </button>
  );
};
