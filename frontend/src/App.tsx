import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import SingleBook from "./pages/SingleBook/SingleBook";
import MyShelf from "./pages/MyShelf/MyShelf";
import Login from "./pages/LogIn/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SignUp from "./pages/SignUp/SignUp";
import SearchResults from "./pages/SearchResults/SearchResults";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div
        className="container flex flex-col w-full max-w-full"
        id="main-container"
      >
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/user/:id" element={<MyShelf />} />
          <Route path="/details/:id" element={<SingleBook />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
