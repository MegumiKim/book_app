import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BookList from "./pages/BookList";
import Book from "./pages/Book";
import MyPage from "./pages/MyPage";
import SingleBook from "./pages/SingleBook";

const App = () => {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/user/:id" element={<MyPage />} />
          <Route path="/details/:id" element={<SingleBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
