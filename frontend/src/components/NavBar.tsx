import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { defaultUser, UserContext } from "../context/UserContext";
import { SearchResultContext } from "../context/SearchResultContext";
import Modal from "./Modal";
import { deleteUserAccount } from "../APICalls/DeleteAccount";
import bookIconOpen from "../assets/book_icon_open.svg";
import bookIconClose from "../assets/book_icon_close.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isModalOpen, setModalOpen] = useState(false);
  const user_id = user.user_id || null;
  const { setSearchResult } = useContext(SearchResultContext);
  const [deleteError, setDeleteError] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount(user.user_id);
      setUser(defaultUser);
      localStorage.removeItem("myBooks");
      localStorage.removeItem("user");
      setModalOpen(false);
      navigate("/signup");
    } catch (error) {
      setDeleteError(true);
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      setFocusedIndex(-1);
    }
  }, [menuOpen]);

  function handleLogOut() {
    setSearchResult({ url: "", results: [] });
    setUser(defaultUser);
    localStorage.removeItem("myBooks");
    setMenuOpen(false);
    navigate("/login");
  }

  function toggleMenuOpen() {
    setMenuOpen(!menuOpen);
    setFocusedIndex(0);
  }

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Bookshelf", path: `/user/${user_id}` },
    { name: "Log Out", action: handleLogOut },
    {
      name: "Delete Account",
      action: () => setModalOpen(true),
      class: "delete-btn",
    },
  ];

  return (
    <nav className="">
      <button>
        <Link to="/" role="button" tabIndex={0} className="logo">
          BookJournal
        </Link>
      </button>

      {user_id === null ? (
        <div>
          {location.pathname === "/login" ? (
            <Link to={"/signup"}>Sign up</Link>
          ) : (
            <Link to={"/login"}>Log in</Link>
          )}
        </div>
      ) : (
        <div className="relative">
          <button onClick={toggleMenuOpen} className="menu-btn">
            <img
              src={menuOpen ? bookIconOpen : bookIconClose}
              alt={`menu ${menuOpen ? "open" : "close"}`}
            />
            <small>Menu</small>
          </button>
          <ul className={menuOpen ? "flex" : "hidden"}>
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.path ? (
                  <Link
                    to={item.path}
                    tabIndex={focusedIndex === index ? 0 : -1}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={item.action || (() => {})}
                    tabIndex={focusedIndex === index ? 0 : -1}
                    className={item.class ? item.class : ""}
                  >
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h3>Are you sure you want to delete account?</h3>
            <div className="flex gap-5 my-5 ">
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-accent"
              >
                Cancel
              </button>
              <button onClick={handleDeleteAccount} className="btn btn-outline">
                Yes, I want to delete
              </button>
            </div>
            {deleteError && (
              <p className="text-red-500">Failed to Delete Account</p>
            )}
          </Modal>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
