import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Array,
      // required: true,
    },
    // genre: {
    //   type: String,
    //   enum: [
    //     "novel",
    //     "non-fiction",
    //     "Si-Fi",
    //     "mystery",
    //     "romance",
    //     "kids",
    //     "history",
    //     "fantasy",
    //     "biography",
    //   ],
    // },
    // yearPublished: {
    //   type: Number,
    //   required: true,
    // },
    review: {
      // name: String,
      rating: Number,
      text: String,
    },

    image: { type: String },
    id: { type: String },
    status: { type: String, enum: ["to-read", "read", "reading"] },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
