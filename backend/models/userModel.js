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
    bookshelf: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
