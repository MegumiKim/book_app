import React, { createContext } from "react";

export const MyBooksContext = createContext();

const MyBooksProvider = ({ children }) => {
  const [myBooks, setMyBooks] = useState([]);

  const addBook = (newBook) => {
    setMyBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const removeBook = (bookId) => {
    setMyBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <MyBooksContext.Provider value={{ myBooks, addBook, removeBook }}>
      {children}
    </MyBooksContext.Provider>
  );
};

export const useMyBooks = () => {
  return useContext(MyBooksContext);
};
