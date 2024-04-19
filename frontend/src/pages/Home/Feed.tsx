import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import { useFetch } from "../../hooks/useFetch";
import BookCard from "../../components/BookCard";

function Feed() {
  const URL = BASE_URL + "reviews/latest-item";
  const [latest, setLatest] = useState({});

  const { data, loading, error } = useFetch(URL);
  useEffect(() => {
    setLatest(data?.data[0]);
  }, [data]);

  return (
    <section className="max-w-full lg:max-w-lg outline outline-2 rounded-md sm:w-[550px] md:w-[400px] m-auto">
      {latest && (
        <div className="m-auto">
          <h3 className="p-2 text-center bg-white text-gray-700">
            {latest.name} has recently added a book!
          </h3>
          <div className="p-6">
            <BookCard
              id={latest.google_book_id}
              title={latest.title}
              thumbnail={latest.imageurl}
              status={latest.status}
              genre={latest.genre}
              author={latest.author}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Feed;
