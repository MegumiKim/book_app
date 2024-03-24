const express = require("express");
const db = require("../db/index.js");
const router = express.Router();

//Get all books
router.get("/", async (req, res) => {
  try {
    const results = await db.query(
      "select * from books;"
      // "select * from books left join (select books_id, count(*), TRUNC(AVG(rating),1) as average_rating from reviews group by books_id) reviews on books.id = reviews.books_id;"
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });

    console.log(results.rows);
  } catch (error) {
    console.log(error);
  }
});

//Get a book
router.get("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM books WHERE book_id = $1",
      // "select * from books left join (select books_id, count(*), TRUNC(AVG(rating),1) as average_rating from reviews group by books_id) reviews on books.id = reviews.books_id WHERE id = $1",
      [req.params.id]
    );
    // Check if any book was found
    if (results.rows.length === 0) {
      // No book found with the given ID
      return res.status(404).json({
        status: "error",
        message: "Book not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the book.",
    });
  }
});

//Create a book
router.post("/", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO books(google_book_id, title, author, isbn) values ($1, $2, $3, $4) returning *;",
      // "INSERT INTO books (name, location, price_range) VALUES ($1, $2, $3) returning *;",
      [req.body.google_book_id, req.body.title, req.body.author, req.body.isbn]
    );

    res.status(201).json({
      status: "success",
      data: results.rows[0],
    });
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});

//Update
router.put("/api/v1/books/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE books SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning * ",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {}
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM books WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
