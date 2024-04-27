import BookCard from "../../components/BookCard";
import { useFetch } from "../../hooks/useFetch";

function Recommendations({ genre, id }) {
  const URL =
    import.meta.env.VITE_REACT_APP_GOOGLE_BOOK_API +
    `volumes?q=subject:'${genre}'`;
  const { data, loading, error } = useFetch(URL);

  const recommendations = data?.items
    .filter((item) => item.id != id)
    .slice(0, 6);
  console.log(recommendations);

  return (
    recommendations && (
      <section className=" outline-slate-400 mt-10">
        <h2 className="my-5">Other Books in {genre}</h2>
        <div className="bookshelf">
          {recommendations.map((item) => (
            <BookCard
              key={item.id}
              title={item.volumeInfo.title}
              author={item.volumeInfo.authors?.[0]}
              genre={item.volumeInfo.categories?.[0]}
              thumbnail={item.volumeInfo.imageLinks?.thumbnail}
              avr_rating={item.volumeInfo.averageRating}
              status={null}
              id={item.id}
              publishedDate={item.volumeInfo.publishedDate}
              saleInfo={item.saleInfo}
            />
          ))}
        </div>
      </section>
    )
  );
}

export default Recommendations;
