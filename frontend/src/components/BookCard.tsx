import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { BookCardProps } from "../types";

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  thumbnail,
  created_at,
  genre,
  status,
  author,
  avr_rating,
  publishedDate,
  saleInfo,
}) => {
  return (
    <Link to={`/details/${id}`} className="book-card" key={created_at}>
      <figure>
        <img src={thumbnail || "./man.jpg"} alt={`Cover of the ${title}`} />
      </figure>
      <div className="content">
        <div>
          {status && (
            <p
              className={
                status === "have read" ? "status read" : "status to-read"
              }
            >
              {status}
            </p>
          )}
          <h2 className="card-title leading-tight">{title}</h2>
          {author && <p className="author">{author}</p>}
          {avr_rating && (
            <div>
              <RatingStars rating={avr_rating} />
            </div>
          )}
          {<p>{publishedDate?.slice(0, 4)}</p>}
        </div>

        <div>
          {saleInfo?.saleability === "FREE" && (
            <button className="status free">FREE</button>
          )}
          {genre && <p className="genre">{genre}</p>}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
