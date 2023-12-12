import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import SingleBook from "./pages/SingleBook/SingleBook";
import MyPage from "./pages/MyPage/MyPage";

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
