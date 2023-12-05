import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MyPage from "./pages/MyPage/MyPage";
import SingleBook from "./pages/SingleBook";
import ReviewForm from "./pages/ReviewForm";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div
        className="container flex flex-col w-full max-w-full"
        id="main-container"
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<MyPage />} />
          <Route path="/details/:id" element={<SingleBook />} />
          <Route path="/review-form/:id" element={<ReviewForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
