// ReviewForm.js
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RatingForm from "./RatingForm";
import { GoogleBookDataType, MyBookType } from "../../types";

interface GoogleBookData {
  volumeInfo: GoogleBookDataType;
  id?: "string";
}

const ReviewForm = (props: {
  data: GoogleBookData;
  onReviewPosted: () => void;
}) => {
  console.log(props.data);

  const book = props.data.volumeInfo;

  const [rating, setRating] = useState(0);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const apiURL = "http://localhost:5000/books/" + props.data.id;
  const apiURL = "https://book-share-app.onrender.com/books/" + props.data.id;

  const onSubmitHandler: SubmitHandler<MyBookType> = async (data) => {
    const body = {
      title: book?.title,
      author: book?.authors,
      review: {
        rating,
        text: data.review,
      },
      image: book?.imageLinks?.thumbnail || "",
      status: "read",
      id: book?.id || "",
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    try {
      const result = await fetch(apiURL, options);
      // const json = await result.json();

      if (result.ok) {
        // Handle the json response, if needed
        // console.log(json);
        props.onReviewPosted();
      } else {
        throw new Error("failed to post review");
      }
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById("closeBtn")?.click();
      reset();
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
        onSubmit={(e) =>
          handleSubmit((data, e) => onSubmitHandler(data as MyBookType, e))(e)
        }
        className="mx-auto max-w-xl"
        id="review-form"
      >
        <h3 className="font-bold text-lg mb-4">Write a review</h3>

        <RatingForm handleChange={handleRatingChange} />
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-bold mb-2">
            Review Text
          </label>
          <textarea
            id="review"
            {...register("review", { required: "Review text is required" })}
            className="w-full border rounded-md p-2 h-40"
            placeholder="Summary / Key take-away / Quotes etc..."
          ></textarea>
          {errors.review && (
            <p className="text-red-500 text-xs mt-1">An Error occurred</p>
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
