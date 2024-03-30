import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SearchResultProvider } from "./context/SearchResultContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <SearchResultProvider>
        <App />
      </SearchResultProvider>
    </UserProvider>
  </React.StrictMode>
);
