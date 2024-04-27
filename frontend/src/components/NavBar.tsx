import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { SearchResultContext } from "../context/SearchResultContext";
import Modal from "./Modal";
import { deleteUserAccount } from "../APICalls/DeleteAccount";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const user_id = user.user_id || null;
  const { setSearchResult } = useContext(SearchResultContext);

  const handleDeleteAccount = async () => {
    await deleteUserAccount(user.user_id, setUser, navigate);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function handleLogOut() {
    setUser({
      user_id: null,
      name: "Guest",
    });
    setSearchResult([]);
    navigate("/");
  }

  function toggleMenuOpen() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="">
      <button>
        <Link to="/" role="button" tabIndex={0} className="logo">
          DreamBooks
        </Link>
      </button>

      {user_id === null ? (
        <Link to={"/login"}>Log in</Link>
      ) : (
        <div className="relative">
          <button onClick={toggleMenuOpen}>Menu</button>
          <ul className={menuOpen ? "flex" : "hidden"}>
            <Link to={`/`}>Home</Link>
            <Link to={`/user/${user_id}`}>Bookshelf</Link>
            <button onClick={handleLogOut}>Log Out</button>
            <button className="border-t-2 pt-3 text-slate-500">
              Delete Account
            </button>
          </ul>

          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2>Are you sure you want to delete account?</h2>
            <div className="flex gap-5 my-5 ">
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-warning"
              >
                Cancel
              </button>
              <button onClick={handleDeleteAccount} className="btn btn-outline">
                Yes, I want to delete
              </button>
            </div>
          </Modal>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
