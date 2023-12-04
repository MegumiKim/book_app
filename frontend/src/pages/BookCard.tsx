import { Link } from "react-router-dom";

const BookCard = (props) => {
  const data = props.data;
  // console.log(data);

  return (
    <div className="card card-side w-full shadow-xl text-left">
      <figure className="w-36">
        <img
          className=""
          src={
            data.imageLinks?.smallThumbnail
              ? data.imageLinks?.smallThumbnail
              : "../../public/night.jpg"
          }
          alt={data.title}
        />
      </figure>
      <div className="card-body flex-1">
        <h2 className="card-title">{data.title}</h2>
        {data.authors?.map((author: string) => (
          <ul>
            <li>{author}</li>
          </ul>
        ))}
        {data.categories?.map((category: string) => (
          <ul>
            <li>{category}</li>
          </ul>
        ))}
        {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
        <div className="card-actions justify-end">
          <Link to={`details/${props.id}`} className="btn btn-primary">
            Read
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
