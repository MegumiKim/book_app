import { useAPI } from "../../hooks/useAPI";
import { GoogleBookDataType, MyBookType } from "../../types";
import { BASE_URL } from "../../utils/constant";
// import { UserLoggedInContext } from "../../context/Context";
// import { useContext } from "react";

// interface UserLoggedInContextType {
//   userLoggedIn: boolean;
//   setUserLoggedIn: React.Dispatch<React.SetStateAction<[]>>;
// }

const AddToRead = (props: {
  data: { volumeInfo: GoogleBookDataType };
  id: string | undefined;
  updateUserFeedback: (arg0: string) => void;
}) => {
  // const AddToRead = (props: {
  //   data: { volumeInfo: GoogleBookDataType };
  //   id: string;
  //   updateUserFeedback: (arg0: string) => void;
  // }) => {
  // const { userLoggedIn, setUserLoggedIn } = useContext(
  //   UserLoggedInContext
  // ) as UserLoggedInContextType;

  const book = props.data?.volumeInfo;
  const id = props.id;

  const bookBody: MyBookType = {
    id,
    imageurl: book.imageLinks?.thumbnail ? book.imageLinks.thumbnail : "",
    title: book.title,
    author: book.authors[0],
    reviews: [],
    status: "to-read",
  };

  // async function onSubmit(body: MyBookType) {
  //   // const URL = "http://localhost:5000/books";
  //   const URL = "https://book-share-app.onrender.com/books";

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   };

  //   try {
  //     const res = await fetch(URL, options);
  //     const json = await res.json();

  //     if (res.ok) {
  //       console.log(json);
  //       props.updateUserFeedback(`"${book.title}" is added to bookshelf`);
  //     } else {
  //       props.updateUserFeedback("Failed to add");
  //       throw new Error();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     props.updateUserFeedback("Book is already in the shelf");
  //   }
  // }

  async function handleAddToRead(bookBody, userID) {
    const URL = BASE_URL + "reviews/user/" + userID;
  }
  return (
    <button
      className="btn btn-secondary"
      onClick={() => handleAddToRead(bookBody, 1)}
    >
      Add to-read
    </button>
  );
};

export default AddToRead;
