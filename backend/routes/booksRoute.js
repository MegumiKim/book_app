import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route: create a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.yearPublished) {
      return res.status(400).send({
        message: "Title, author and published year have to be filled",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      yearPublished: req.body.yearPublished,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//Route: Fetch all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      total: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});
//Route: Update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.yearPublished) {
      return res.status(400).send({
        message: "Title, author and published year have to be filled",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});
//Route: Delete by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
