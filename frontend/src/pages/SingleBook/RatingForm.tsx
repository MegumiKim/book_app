const RatingForm = ({
  selectedRating,
  handleChange,
}: {
  selectedRating: number | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="rating rating-sm">
      <label htmlFor="rating" className="me-5">
        Rating
      </label>
      <div id="rating">
        {[1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            type="radio"
            value={index}
            name="rating-2"
            className={`mask mask-star-2 ${
              selectedRating && selectedRating >= index ? "bg-green-300" : ""
            }`}
            onChange={handleChange}
            defaultChecked={false}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingForm;
