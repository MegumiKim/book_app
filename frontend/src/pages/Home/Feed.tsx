import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import { useFetch } from "../../hooks/useFetch";
import BookCard from "../../components/BookCard";
import RatingStars from "../../components/RatingStars";
import userIcon from "../../../public/icons/user.svg";
interface Book {
  name: string;
  created_at: string;
  status: string;
  google_book_id: string;
  title: string;
  author?: string | null;
  genre?: string;
  imageurl?: string;
  rating?: number;
}

interface FetchResponse {
  data: Book[] | undefined;
}

function Feed() {
  const URL = BASE_URL + "reviews/feed";
  const [latest, setLatest] = useState<Book[]>([]);

  const { data, loading, error } = useFetch<FetchResponse>(URL) || [];
  useEffect(() => {
    setLatest(data?.data || []);
  }, [data]);

  return (
    <section className="mt-32">
      {loading && (
        <div className="w-full justify-center flex flex-col gap-4 mb-10">
          <p className="m-auto">Loading...</p>
          <span className="m-auto loading loading-spinner text-secondary"></span>
        </div>
      )}
      {error && (
        <div className="text-red-400 text-xl">Failed to fetch data :-/</div>
      )}

      <h2 className="text-white mb-5">Community Updates</h2>
      <div className="bookshelf">
        {latest.length &&
          latest.map((item, i) => (
            <div
              className="flex flex-col gap-3 mt-3 outline-1 rounded-md "
              key={i}
            >
              <h3 className="text-white flex gap-2 align-baseline">
                <div className="max-w-[20px] w-full ">
                  <img src={userIcon} alt="user icon" />
                </div>
                <span>{item.name}</span>
                {item.status === "to read" && "wants to read"}
                {item.rating && (
                  <span className="flex gap-1">
                    rated a book
                    <RatingStars rating={item.rating} />
                  </span>
                )}
              </h3>
              <BookCard
                id={item.google_book_id}
                title={item.title}
                thumbnail={item.imageurl || ""}
                genre={item.genre}
                author={item.author || ""}
              />
            </div>
          ))}
      </div>
    </section>
    // <section className="max-w-full lg:max-w-lg outline outline-2 rounded-md sm:w-[550px] md:w-[400px] m-auto">
    //   {latest && (
    //     <div className="m-auto">
    //       <h3 className="p-2 text-center bg-white text-gray-700">
    //         {latest.name} has recently added a book!
    //       </h3>
    //       <div className="p-6">
    //         <BookCard
    //           id={latest.google_book_id}
    //           title={latest.title}
    //           thumbnail={latest.imageurl}
    //           status={latest.status}
    //           genre={latest.genre}
    //           author={latest.author}
    //         />
    //       </div>
    //     </div>
    //   )}
    // </section>
  );
}

export default Feed;
