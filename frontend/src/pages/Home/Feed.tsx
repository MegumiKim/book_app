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
    console.log(latest);
  }, [data]);

  return (
    <section>
      Feed
      {latest && (
        <div>
          <h3>
            <span>{latest.created_at}</span>
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
