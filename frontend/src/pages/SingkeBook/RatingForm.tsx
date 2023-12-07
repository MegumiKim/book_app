const RatingForm = ({ handleChange }) => {
  // console.log(rating);

  return (
    <div className="rating rating-sm">
      {[1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          type="radio"
          value={index}
          name="rating-2"
          className="mask mask-star-2 bg-green-400 "
          // defaultChecked={rating >= index}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default RatingForm;
