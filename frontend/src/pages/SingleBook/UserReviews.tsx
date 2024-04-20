import RatingStars from "../../components/RatingStars.tsx";
import { useFetch } from "../../hooks/useFetch.tsx";
import { BASE_URL } from "../../utils/constant.ts";

function UserReviews({ book_id }) {
  const reviewsURL = `${BASE_URL}reviews/${book_id}`;

  // Fetch reviews data
  const { data } = useFetch(reviewsURL);
  const reviewsData = data?.data;

  const reviews = reviewsData?.map((review, i) => (
    <div className="border-l-4 pl-4" key={i}>
      <div className="flex gap-3 align-bottom">
        <p>By {review.name}</p>
        <RatingStars rating={review.rating} />
      </div>
      <p className="max-h-48 overflow-scroll mt-5">{review.review}</p>
    </div>
  ));

  return (
    data?.results > 0 && (
      <section className="outline outline-slate-400">
        <h2 className="">Reviews</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-5">{reviews}</div>
      </section>
    )
  );
}

export default UserReviews;
