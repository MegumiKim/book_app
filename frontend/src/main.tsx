import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BookContext } from "./context/BookContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BookContext>
      <App />
    </BookContext>
  </React.StrictMode>
);
