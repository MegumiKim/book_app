import { Link } from "react-router-dom";
import { BookDataType } from "../../types";
import RatingStars from "../../components/RatingStars";

interface MyPageCardProps {
  data: BookDataType;
  onRemove: (title) => void;
}

const MyPageCard: React.FC<MyPageCardProps> = ({ data, onRemove }) => {
  console.log(data);

  if (!data) {
    return <p>error</p>;
  }
  const URL = "http://localhost:5000/" + "books/" + data._id;

  const rawDate = data.updatedAt;
  const dateObject = new Date(rawDate);
  const dateString = dateObject.toLocaleDateString();

  async function removeBook() {
    try {
      const options = {
        method: "DELETE",
      };
      const res = await fetch(URL, options);
      // const json = await res.json();

      if (res.ok) {
        onRemove(data.title);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card card-side shadow-xl text-left overflow-x-clip bg-slate-700 bg-opacity-70 text-slate-200 ">
      <figure className="">
        <img
          className=""
          src={data.image ? data.image : "/night.jpg"}
          alt={data.title}
        />
      </figure>
      <div className="flex-1 px-4 p-4 justify-between flex flex-col">
        <div>
          <Link
            to={`/details/${data.id}`}
            className="card-title text-ellipsis hover:underline line-clamp-3"
          >
            {data.title}
          </Link>
          {data.author?.length && <p>{data.author[0]}</p>}
        </div>

        <div className="">
          <p
            className={
              data.status === "read" ? "text-pink-600" : "text-green-400"
            }
          >
            {data.status}
          </p>
          {data.status === "read" ? (
            <div>
              My Rating <RatingStars rating={data.review?.rating} />
            </div>
          ) : (
            ""
          )}
          <p>Added on {dateString}</p>
          <div className="w-full flex justify-end absolute bottom-0 right-4">
            <div
              className="card-actions justify-end bg-slate-400 rounded-full p-2 w-8 my-4 hover:bg-slate-500"
              onClick={removeBook}
            >
              <img src="../../../public/icons/delete.svg" alt="" className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageCard;
