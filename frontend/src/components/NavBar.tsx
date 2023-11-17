import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Book Cafe</a>
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
    </div>
  );
};

export default NavBar;
