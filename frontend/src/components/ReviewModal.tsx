// ReviewForm.js
import { useForm } from "react-hook-form";

const ReviewForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          {...register("name", { required: "Name is required" })}
          className="w-full border rounded-md p-2"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="review"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Review Text
        </label>
        <textarea
          id="review"
          name="review"
          {...register("review", { required: "Review text is required" })}
          className="w-full border rounded-md p-2"
        ></textarea>
        {errors.review && (
          <p className="text-red-500 text-xs mt-1">{errors.review.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="rating"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Rating (1-5)
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          {...register("rating", {
            required: "Rating is required",
            min: { value: 1, message: "Rating must be at least 1" },
            max: { value: 5, message: "Rating must be at most 5" },
          })}
          className="w-full border rounded-md p-2"
        />
        {errors.rating && (
          <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
        )}
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
