import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    bookshelf: [
      {
        book: {
          // type: mongoose.Schema.Types.ObjectId,
          // ref: "Book",
        },
        status: {
          type: String,
          enum: ["have-read", "to-read"],
          default: "to-read",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
