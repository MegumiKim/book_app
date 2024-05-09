import RatingStars from "../../components/RatingStars.tsx";
import { reviewDataType } from "./SingleBook.tsx";

function UserReviews({ reviews }: { reviews: reviewDataType[] }) {
  return (
    reviews?.length > 0 && (
      <section>
        <h2>Reviews</h2>
        <div className="grid grid-flow-col sm:grid-cols-2 mt-5 gap-5">
          {reviews.map((review: reviewDataType, i: number) => (
            <div key={i} className="border-s-4 px-5">
              <div className="flex gap-5 align-center">
                <p className="font-bold">{review.name}</p>
                <RatingStars rating={review.rating || 0} />
              </div>
              <p className="p-3">{review.review}</p>
            </div>
          ))}
        </div>
      </section>
    )
  );
}

export default UserReviews;
