import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

interface BookCardProps {
  id: string;
  title: string;
  thumbnail: string | null;
  created_at: string;
  genre?: string | null | undefined;
  status?: string | null;
  author?: string | null;
  avr_rating?: number;
  saleInfo?: { saleability: string; buyLink: string };
}
const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  thumbnail,
  created_at,
  genre,
  status,
  author,
  avr_rating,
  saleInfo,
}) => {
  return (
    <Link to={`/details/${id}`} className="book-card" key={id}>
      <figure className="figure">
        <img
          src={thumbnail || "/night.jpg"}
          alt={`Cover of the book titled ${title}`}
        />
      </figure>
      <div className="content">
        <div>
          <h2 className="card-title">{title}</h2>
          {author && <p className="author">{author}</p>}
          {avr_rating && (
            <div>
              <RatingStars rating={avr_rating} />
            </div>
          )}
        </div>
        <div>
          {status && (
            <p
              className={
                status === "have read" ? "status-read" : "status-not-read"
              }
            >
              {status}
            </p>
          )}
          {saleInfo?.saleability === "FREE" && (
            <button className="btn-free">FREE</button>
          )}
          {genre && <p className="genre">{genre}</p>}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
