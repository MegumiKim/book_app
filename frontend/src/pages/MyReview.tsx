import RatingStars from "../components/RatingStars";
import { useFetch } from "../hooks/useFetch";

const MyReview = ({ id }) => {
  const URL = `http://localhost:5000/books/${id}`;
  const { data } = useFetch(URL);

  if (!data) {
    return <></>;
  }

  return (
    <>
      {data?.reviews?.length ? (
        <section className="my-5 outline rounded-sm p-4">
          <h1>My Review</h1>
          {data.reviews.map((rev, i) => (
            <div key={i}>
              <div>Name: {rev.name}</div>
              <RatingStars rating={rev.rating} />
              <div>Subject: {rev.subject}</div>
              <div>{rev.review}</div>
            </div>
          ))}
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default MyReview;
