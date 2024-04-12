import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SearchResultProvider } from "./context/SearchResultContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { MyShelfProvider } from "./context/MyShelfContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <MyShelfProvider>
        <SearchResultProvider>
          <App />
        </SearchResultProvider>
      </MyShelfProvider>
    </UserProvider>
  </React.StrictMode>
);
