import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="navbar bg-transparent max-w-6xl m-auto text-slate-200">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost text-xl sm:text-3xl">
          BookJournal
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 sm:text-xl">
          <li>
            <Link to="/home" className="hidden sm:block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/user">Bookshelf</Link>
          </li>
          <li>
            <Link to={`/user/${user.user_id}`}>User</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
