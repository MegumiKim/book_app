// ReviewForm.js
import { useForm } from "react-hook-form";

const ReviewForm = (props) => {
  const book = props.data.volumeInfo;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {
    console.log(data);
    const body = {
      title: book.title,
      author: book.authors,
      reviews: [data],
      image: book.imageLinks.thumbnail,
      status: "read",
      id: props.data.id,
    };
    console.log(body);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    try {
      const result = await fetch(
        "http://localhost:5000/books/",
        options
        // "https://book-share-app.onrender.com/books/",
      );
      console.log(result);

      const json = await result.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById("closeBtn")?.click();
      document.getElementById("review-form")?.reset();
    }
  };

  return (
    <main className="container ">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button
          id="closeBtn"
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-2"
        >
          close
        </button>
      </form>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="mx-auto max-w-xl"
        id="review-form"
      >
        <h3 className="font-bold text-lg mb-4">Write a review</h3>
        {/* <h3 className="font-bold text-lg">Write a review on {book.title}</h3> */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-bold mb-2">
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min={1}
            max={5}
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
          <label htmlFor="name" className="block text-sm font-bold mb-2">
            Your Name
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
          <label htmlFor="subject" className="block text-sm font-bold mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            {...register("subject")}
            className="w-full border rounded-md p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-bold mb-2">
            Review Text
          </label>
          <textarea
            id="review"
            name="review"
            {...register("review", { required: "Review text is required" })}
            className="w-full border rounded-md p-2 h-40"
            placeholder="Summary / Key take-away / Quotes etc..."
          ></textarea>
          {errors.review && (
            <p className="text-red-500 text-xs mt-1">{errors.review.message}</p>
          )}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </form>
    </main>
  );
};

export default ReviewForm;
