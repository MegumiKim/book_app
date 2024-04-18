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
    <section className="max-w-full lg:max-w-lg border p-8">
      {latest && (
        <div className="m-auto">
          <h3 className="text-xl mb-5 text-white">
            {latest.name} has recently added a book in bookshelf
          </h3>
          <BookCard
            id={latest.google_book_id}
            title={latest.title}
            thumbnail={latest.imageurl}
            status={latest.status}
            genre={latest.genre}
            author={latest.author}
          />
        </div>
      )}
    </section>
  );
}

export default Feed;
