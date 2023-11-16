import express from "express";
import { User } from "../models/userModel.js";

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

// Add a book to user's bookshelf
router.put("/add/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { bookID } = req.body;

    const result = await User.findByIdAndUpdate(
      id,
      { $push: { bookshelf: bookID } },
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

export default router;
