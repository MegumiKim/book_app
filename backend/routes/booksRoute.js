import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route: create a new book
router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    // Check if the book already exists based on title and author
    const existingBook = await Book.findOne({ id });

    if (existingBook) {
      return res.status(400).send({
        message: "Book with the same title and author already exists",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      reviews: req.body.reviews,
      id: req.body.id,
      image: req.body.image,
      status: req.body.status,
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
//Route: Fetch a single book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = { id: id };

    const result = await Book.findOne(query);
    // const result = await Book.findById(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});
//Route: Update a book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, author, review, image, status } = req.body;

    const result = await Book.findOneAndUpdate(
      { id: id },
      {
        $set: {
          title,
          author,
          review,
          image,
          status,
        },
      },
      { new: true, upsert: true }
    );
    return res.status(200).json({ message: "Book updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Add a review
// router.put("/review/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, subject, review, rating } = req.body;

//     const result = await Book.findByIdAndUpdate(
//       {
//         $push: {
//           reviews: {
//             name,
//             subject,
//             review,
//             rating,
//           },
//         },
//       },
//       { new: true, upsert: true }
//     );

//     return res.status(200).json({ message: "Review Posted" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: err.message });
//   }
// });
//Route: Delete by id
router.delete("/:id", async (req, res) => {
  try {
    // const { id } = req.body._id;
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

// Route: Clear all books
router.delete("/", async (req, res) => {
  try {
    const result = await Book.deleteMany({});

    return res.status(200).json({ message: "All Books Cleared" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

export default router;
