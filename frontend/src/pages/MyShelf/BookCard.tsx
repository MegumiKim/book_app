import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const BookCard = ({ id, book }) => {
  const formattedReadDate = formatDate(book.read_date);
  return (
    <Link to={`/details/${id}`} className="card outline p-2 hover:outline-4">
      <h3 key={id}>{book.title}</h3>
      <p>{book.author}</p>
      <p>Finished on {formattedReadDate}</p>
    </Link>
  );
};

export default BookCard;
