import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Array,
    },
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
