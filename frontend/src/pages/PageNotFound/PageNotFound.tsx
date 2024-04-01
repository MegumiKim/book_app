import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main>
      <h1>Page Not Found :-/</h1>
      <Link to="/home" className="btn btn-outline my-5">
        Back to Home
      </Link>
    </main>
  );
}

export default PageNotFound;
