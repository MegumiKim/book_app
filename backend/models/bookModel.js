import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "novel",
        "non-fiction",
        "Si-Fi",
        "mystery",
        "romance",
        "kids",
        "history",
        "fantasy",
        "biography",
      ],
    },
    yearPublished: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        name: String,
        text: String,
        rating: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
