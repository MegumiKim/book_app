import { useContext, useEffect, useState, MouseEvent } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../utils/constant";
import BookCard from "../../components/BookCard";

interface Book {
  status: string;
  google_book_id: string;
  title: string;
  author?: string | null;
  genre?: string;
  imageurl?: string;
}

interface FetchResponse {
  data: Book[];
}

const MyShelf = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [bookShelf, setBookShelf] = useState<Book[]>([]);
  const [toReadShelf, setToReadShelf] = useState<Book[]>([]);
  const [haveReadShelf, setHaveReadShelf] = useState<Book[]>([]);
  const [selectedTab, setSelectedTab] = useState("toRead");

  const bookShelfURL = BASE_URL + "reviews/user/" + id;
  const { data, loading, error } = useFetch<FetchResponse>(bookShelfURL);
  // const {myBooks, setMyBooks} = useContext(MYS)

  useEffect(() => {
    const toReads = data?.data.filter(
      (item: { status: string }) => item.status === "to read"
    );
    const haveReads = data?.data.filter(
      (item: { status: string }) => item.status === "have read"
    );

    setBookShelf(toReads || []);
    setToReadShelf(toReads || []);
    setHaveReadShelf(haveReads || []);
  }, [data]);

  function toggleBookShelf(e: MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement;
    const shelf = target.dataset.shelf;

    if (shelf === "toReads") {
      setBookShelf(toReadShelf);
      setSelectedTab("toRead");
    } else if (shelf === "haveReads") {
      setBookShelf(haveReadShelf);
      setSelectedTab("haveReads");
    }
  }

  return (
    <main className="">
      <div className="flex justify-between">
        <h2 className="text-lg">Welcome Back {user.name}!</h2>
      </div>
      <h1 className="mb-5">Book shelf ({data?.data.length}) </h1>

      {loading && (
        <div className="w-full justify-center flex flex-col gap-4 mb-10">
          <p className="m-auto">Loading...</p>
          <span className="m-auto loading loading-spinner text-secondary"></span>
        </div>
      )}
      {error && (
        <div className="text-red-400 text-xl">Failed to fetch data :-/</div>
      )}

      <div role="tablist" className="tab-list mb-10 ">
        <button
          className={`tab gap-1 ${selectedTab === "toRead" && "selected-tab"}`}
          onClick={(e) => toggleBookShelf(e)}
          data-shelf="toReads"
        >
          To Read <span>({toReadShelf?.length})</span>
        </button>
        <button
          className={`tab gap-1 ${
            selectedTab === "haveReads" && "selected-tab"
          }`}
          onClick={toggleBookShelf}
          data-shelf="haveReads"
        >
          Have Read <span>({haveReadShelf?.length})</span>
        </button>
      </div>
      {/* <div>{shelfToBeDisplayed}</div> */}
      <div className="bookshelf">
        {bookShelf?.length
          ? bookShelf.map((book) => (
              <BookCard
                id={book.google_book_id}
                title={book.title || ""}
                author={book.author || ""}
                status={book.status}
                genre={book.genre}
                thumbnail={book.imageurl || ""}
                key={book.google_book_id}
              />
            ))
          : "No book found"}
      </div>
    </main>
  );
};

export default MyShelf;
