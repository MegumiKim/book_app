import { Link } from "react-router-dom";

const BookCard = ({ id, book }) => {
  console.log(book);

  return (
    <Link
      to={`/details/${id}`}
      className="card outline p-2 hover:outline-4 flex flex-row gap-5"
    >
      <div>
        <img src={book.imageurl} alt={`book cover of ${book.title}`} />
      </div>
      <div>
        <h3 className="font-bold">{book.title}</h3>
        <p>{book.author}</p>
        <p
          className={
            book.status === "have read" ? "text-red-500" : "text-green-500"
          }
        >
          {book.status}
        </p>
        {/* {book.stats === "have read" && <p>{book.read_date}</p>} */}
      </div>
    </Link>
  );
};

export default BookCard;
