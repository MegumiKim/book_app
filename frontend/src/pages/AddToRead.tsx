import { MyBookType } from "../types";

const AddToRead = (props) => {
  const book = props.data?.volumeInfo;
  const id = props.id;

  const bookBody: MyBookType = {
    id,
    image: book.imageLinks.thumbnail,
    title: book.title,
    author: book.authors,
    reviews: [],
    status: "to-read",
  };

  async function onSubmit(body: MyBookType) {
    const URL = "http://localhost:5000/books";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const res = await fetch(URL, options);
      const json = await res.json();

      if (res.ok) {
        console.log(json);
        props.updateUserFeedback(`"${book.title}" is added to bookshelf`);
      } else {
        props.updateUserFeedback("Failed to add");
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      props.updateUserFeedback("Failed to add :-/");
    }
  }

  return (
    <button className="btn btn-secondary" onClick={() => onSubmit(bookBody)}>
      Add to-read
    </button>
  );
};

export default AddToRead;
