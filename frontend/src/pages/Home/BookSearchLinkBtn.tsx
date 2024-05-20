import { useContext } from "react";
import { SearchResultContext } from "../../context/SearchResultContext";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

type SearchLinkProps = {
  children: ReactNode; // ReactNode allows any type of react children
  URL: string;
};

const BookSearchLinkBtn: React.FC<SearchLinkProps> = ({ children, URL }) => {
  const { setSearchResult } = useContext(SearchResultContext);

  const navigate = useNavigate();

  async function handleClick() {
    try {
      const result = await fetch(URL);
      const json = await result.json();

      if (!result.ok) {
        throw new Error();
      } else {
        if (json.totalItems === 0) {
          return;
        }

        setSearchResult({ url: URL, results: json.items });
      }
    } catch (error) {
      console.error(error);
      // setError("Failed to Fetch Data");
    } finally {
      navigate("/search");
    }
  }

  return <button onClick={handleClick}>{children}</button>;
};

export default BookSearchLinkBtn;
