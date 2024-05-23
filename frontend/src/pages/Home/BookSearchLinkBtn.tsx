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
    console.log("click");

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
        navigate("/search");
      }
    } catch (error) {
      console.error(error);
      // setError("Failed to Fetch Data");
    }
  }
  return (
    <button
      onClick={handleClick}
      className="w-full h-full underline text-nowrap"
    >
      {children}
    </button>
  );
};

export default BookSearchLinkBtn;
