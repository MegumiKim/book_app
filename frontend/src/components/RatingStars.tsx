const RatingStars = ({ rating }) => {
  console.log(rating);

  return (
    <div className="rating rating-sm">
      {[1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
          defaultChecked={rating >= index}
          disabled
        />
      ))}
    </div>
  );
};

export default RatingStars;
