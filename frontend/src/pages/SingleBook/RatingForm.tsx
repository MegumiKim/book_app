const RatingForm = ({
  handleChange,
}: {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  // console.log(rating);

  return (
    <div className="rating rating-sm">
      {[1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          type="radio"
          value={index}
          name="rating-2"
          className="mask mask-star-2 "
          onChange={handleChange}
          defaultChecked={false}
        />
      ))}
    </div>
  );
};

export default RatingForm;
