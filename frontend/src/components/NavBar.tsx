import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar bg-transparent max-w-6xl m-auto">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Book Journal
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Link</Link>
          </li>
          <li>
            <Link to="/user">My Bookshelf</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
