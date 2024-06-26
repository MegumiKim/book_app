import { Link } from "react-router-dom";
import catImage from "../../assets/cat-sm.jpg";

function PageNotFound() {
  return (
    <main className="sm:flex gap-10 sm:my-10 ">
      <div className="max-w-[500px] ">
        <img
          src={catImage}
          alt="cat sitting on top of a pile of books"
          className="rounded-full"
        />
      </div>
      <div className="">
        <h1>Page Not Found :-/</h1>
        <Link to="/" className="btn btn-outline my-5">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default PageNotFound;
