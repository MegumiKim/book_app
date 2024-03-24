import express from "express";
import { User } from "../models/userModel.js";
import { Book } from "../models/bookModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const router = express.Router();

//Route: create a new user
router.post("/", async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(400).send({
        message: "Username is required",
      });
    }
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      bookshelf: [],
    };
    const result = await User.create(newUser);
    return res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//Route: Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      total: users.length,
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//Route: Fetch a single user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };

    const result = await User.findOne(query);
    // const result = await User.findById(id);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//Route: Update an user
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(400).send({
        message: "username is required",
      });
    }

    const { id } = req.params;

    const result = await User.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//Route: Delete by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Route: Clear all users
router.delete("/", async (req, res) => {
  try {
    const result = await User.deleteMany({});

    return res.status(200).json({ message: "All Users Cleared" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});
export default router;

// Add a book to user's bookshelf
router.put("/:userId/bookshelf/add", async (req, res) => {
  try {
    const { userId } = req.params;
    const { id, title, author, review, status, image } = req.body;

    // Check if the book exists
    const existingBook = await Book.findOne({ id: id });

    let book;

    // If the book doesn't exist, create it
    if (!existingBook) {
      const newBook = {
        id,
        title,
        author,
        review,
        image,
      };
      const createdBook = await Book.create(newBook);
      book = createdBook;
    } else {
      // If the book exists, use its ID
      book = existingBook;
    }

    const result = await User.findByIdAndUpdate(
      userId,
      { $push: { bookshelf: { book, status } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Update the status of a book in user's bookshelf
router.put("/review/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const result = await User.findOneAndUpdate(
      { _id: userId, "bookshelf.book._id": bookId },
      { $set: { "bookshelf.$.status": "have-read" } },
      { new: true }
    );

    console.log(userId, bookId, result);
    if (!result) {
      return res
        .status(404)
        .json({ message: "User or book not found in the bookshelf" });
    }

    return res
      .status(200)
      .json({ message: "Book status updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Delete a single book in user's bookshelf
router.put("/:userId/bookshelf/delete", async (req, res) => {
  try {
    const { userId } = req.params;
    const { bookId } = req.body;

    const result = await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          bookshelf: { book: { _id: bookId } },
        },
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Book removed from bookshelf" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Delete all in user's bookshelf
router.put("/:userId/bookshelf/delete-all", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { bookshelf: [] } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Cleared bookshelf" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Fetch user's bookshelf
router.get("/:id/bookshelf", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("bookshelf");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.bookshelf);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});
