import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const user_id = user.user_id || null;

  function handleLogOut() {
    setUser({
      user_id: null,
      name: "Guest",
    });

    navigate("/home");
  }
  return (
    <nav className="navbar bg-transparent max-w-6xl m-auto text-slate-200">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost text-xl sm:text-3xl">
          BookJournal
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 sm:text-xl">
          {!user_id ? (
            <div className="flex">
              <li>
                <Link to={"/"}>Log in</Link>
              </li>
              <li>
                <Link to={"/signup"}>Sign up</Link>
              </li>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row">
              <li>
                <Link to={`/user/${user_id}`}>Bookshelf</Link>
              </li>
              <li>
                <button onClick={() => handleLogOut()}>Log Out</button>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
