import { createContext, useState, useEffect } from "react";

export const SearchResultContext = createContext({});
export const UserContext = createContext({});

const defaultUser = {
  user_id: null,
  name: "Guest",
};
export const BookContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchResult, setSearchResult] = useState([]);
  // Initialize user state with data from localStorage if it exists
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  // Use useEffect to update localStorage when the user state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </SearchResultContext.Provider>
  );
};

// export const useSearchResult = () => {
//   return useContext(SearchResultContext);
// };
