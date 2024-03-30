const RatingForm = ({
  selectedRating,
  handleChange,
}: {
  selectedRating: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="rating rating-sm">
      {[1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          type="radio"
          value={index}
          name="rating-2"
          className={`mask mask-star-2 ${
            selectedRating >= index ? "bg-green-300" : ""
          }`}
          onChange={handleChange}
          defaultChecked={false}
        />
      ))}
    </div>
  );
};

export default RatingForm;
