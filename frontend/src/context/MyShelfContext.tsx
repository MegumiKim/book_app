import React, { createContext, useState, useEffect } from "react";

interface MyBooksType {}

interface MyShelfContextType {
  myBooks: MyBooksType[];
  setUser: React.Dispatch<React.SetStateAction<MyBooksType[]>>;
}
export const MyShelfContext = createContext<MyShelfContextType>(
  {} as MyShelfContextType
);

export const MyShelfProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [myBooks, setMyBooks] = useState(() => {
    const savedBooks = localStorage.getItem("myBooks");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  // Use useEffect to update localStorage when the user state changes
  useEffect(() => {
    localStorage.setItem("myBooks", JSON.stringify(myBooks));
  }, [myBooks]);

  return (
    <MyShelfContext.Provider value={{ myBooks, setMyBooks }}>
      {children}
    </MyShelfContext.Provider>
  );
};

// import React, { createContext } from "react";

// export const MyBooksContext = createContext();

// const MyBooksProvider = ({ children }) => {
//   const [myBooks, setMyBooks] = useState([]);

//   const addBook = (newBook) => {
//     setMyBooks((prevBooks) => [...prevBooks, newBook]);
//   };

//   const removeBook = (bookId) => {
//     setMyBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
//   };

//   return (
//     <MyBooksContext.Provider value={{ myBooks, addBook, removeBook }}>
//       {children}
//     </MyBooksContext.Provider>
//   );
// };

// export const useMyBooks = () => {
//   return useContext(MyBooksContext);
// };
