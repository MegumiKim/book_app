import { Link } from "react-router-dom";
import { GoogleBookDataType } from "../types";

interface BookCardProps {
  data: GoogleBookDataType;
  id: string;
}
const BookCard: React.FC<BookCardProps> = ({ data, id }) => {
  return (
    <Link
      to={`details/${id}`}
      className="card card-side w-full shadow-md px-4 text-left bg-opacity-20 bg-slate-700 hover:bg-opacity-60"
    >
      <figure className="">
        <img
          className=""
          src={
            data.imageLinks?.smallThumbnail
              ? data.imageLinks?.smallThumbnail
              : "/public/night.jpg"
          }
          alt={data.title}
        />
      </figure>
      <div className="card-body flex-1 ">
        <h2 className="card-title line-clamp-3">{data.title}</h2>
        <div className="divide-y divide-solid divide-slate-500 flex flex-col gap-5">
          {data.authors?.length && <p>{data.authors[0]}</p>}
          {data.categories?.map((category: string, i: number) => (
            <ul className="pt-2">
              <li key={i}>{category}</li>
            </ul>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
