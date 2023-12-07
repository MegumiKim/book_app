import { Link } from "react-router-dom";
import { GoogleBookDataType } from "../types";

interface BookCardProps {
  data: GoogleBookDataType;
  id: string;
}
const BookCard: React.FC<BookCardProps> = ({ data, id }) => {
  console.log(data);

  return (
    <Link
      to={`details/${id}`}
      className="card card-side w-full shadow-md px-4 text-left text-slate-200 bg-opacity-20 bg-slate-700 hover:bg-opacity-60 "
    >
      <figure className="">
        <img
          src={
            data.imageLinks?.thumbnail
              ? data.imageLinks?.thumbnail
              : "/night.jpg"
          }
          alt={data.title}
        />
      </figure>
      <div className="flex flex-col p-4 justify-between flex-1 ">
        <div>
          <h2 className="card-title line-clamp-3">{data.title}</h2>
          {data.authors?.length && <p>{data.authors[0]}</p>}
        </div>

        {data.categories?.map((category: string) => (
          <ul className="pt-2 border-t border-slate-500  flex flex-col gap-5">
            <li key={category}>{category}</li>
          </ul>
        ))}
      </div>
    </Link>
  );
};

export default BookCard;
