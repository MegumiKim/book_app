const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="rating rating-sm">
      {[1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          type="radio"
          value={index}
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
          checked={rating >= index}
          disabled
        />
      ))}
    </div>
  );
};

export default RatingStars;
