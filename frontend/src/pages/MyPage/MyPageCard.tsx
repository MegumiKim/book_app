import { Link } from "react-router-dom";

const MyPageCard = (props) => {
  const data = props.data;
  const URL = "http://localhost:5000/" + "books/" + data._id;
  // console.log(URL);

  async function removeBook() {
    try {
      const options = {
        method: "DELETE",
      };
      const res = await fetch(URL, options);
      const json = await res.json();

      // console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card card-side shadow-xl text-left overflow-x-clip">
      <figure className="">
        <img
          className=""
          src={data.image ? data.image : "../../public/night.jpg"}
          alt={data.title}
        />
      </figure>
      <div className="flex-1 px-4 relative">
        <Link
          to={`/details/${data.id}`}
          className="card-title text-ellipsis hover:underline"
        >
          {data.title}
        </Link>
        <p>{data.author[0]}</p>
        <p
          className={
            data.status === "read" ? "text-pink-600" : "text-green-400"
          }
        >
          {data.status}
        </p>

        {data.status === "read"
          ? `My rating : ${data.reviews[0]?.rating} `
          : ""}
        {/* {data.categories?.map((category) => (
          <ul>
            <li>{category}</li>
          </ul>
        ))} */}
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
  );
};

export default MyPageCard;
