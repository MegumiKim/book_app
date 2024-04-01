import { Link } from "react-router-dom";

interface BookCardProps {
  title: string;
  thumbnail: string | null;
  genre: string | null;
  status: string | null;
  author: string | null;
  id: string;
  created_at: string;
}
const BookCard: React.FC<BookCardProps> = ({
  title,
  thumbnail,
  genre,
  status,
  author,
  id,
  created_at,
}) => {
  return (
    <Link
      key={id}
      to={`/details/${id}`}
      className="card card-side w-full shadow-md text-left text-slate-200 bg-opacity-20 bg-slate-700 hover:bg-opacity-60"
    >
      <figure className="w-20 sm:w-40">
        <img
          src={thumbnail ? thumbnail : "/night.jpg"}
          alt={`book cover of ${title}`}
        />
      </figure>
      <div className="flex flex-col p-4 justify-between flex-1 ">
        <div>
          <h2 className="card-title line-clamp-3">{title}</h2>
          {author && <p className="">{author}</p>}
        </div>
        <div>
          <div className="text-end mb-3">
            {status && (
              <p
                className={
                  status === "have read" ? "text-red-500" : "text-green-500"
                }
              >
                {status}
              </p>
            )}
          </div>
          {/* {created_at ? <p>{created_at}</p> : ""} */}
          {genre && (
            <p className="pt-2 border-t border-slate-500  flex flex-col gap-5">
              {genre}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
