const express = require("express");
const db = require("../db/index.js");
const router = express.Router();
const { checkIfBookExists, addBookToTable } = require("./books.js");
const fs = require("fs");
const path = require("path");

//Get all reviews
router.get("/", async (req, res) => {
  try {
    const results = await db.query(
      "select * from user_book_relationships;"
      // "select * from books left join (select books_id, count(*), TRUNC(AVG(rating),1) as average_rating from reviews group by books_id) reviews on books.id = reviews.books_id;"
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//
//Get all reviews for a specific book
router.get("/:id", async (req, res) => {
  const sqlFilePath = path.join(__dirname, "..", "sql", "bookReviews.sql");
  const sqlQuery = fs.readFileSync(sqlFilePath, { encoding: "utf-8" });
  try {
    const results = await db.query(sqlQuery, [req.params.id]);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//Get all books for a specific user
router.get("/user/:id", async (req, res) => {
  const sqlFilePath = path.join(__dirname, "..", "sql", "booksByUser.sql");
  const sqlQuery = fs.readFileSync(sqlFilePath, { encoding: "utf-8" });

  try {
    const results = await db.query(sqlQuery, [req.params.id]);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

// Add a book in user's shelf
router.post("/user/:id", async (req, res) => {
  const sqlFilePath = path.join(__dirname, "..", "sql", "insertToUBR.sql");
  const sqlQuery = fs.readFileSync(sqlFilePath, { encoding: "utf-8" });
  const book_id = req.body.google_book_id;

  try {
    // Check if the book exists in the 'books' table
    const bookExists = await checkIfBookExists(book_id);

    // If not, add the book to the 'books' table
    if (!bookExists) {
      await addBookToTable(req.body);
    }

    const results = await db.query(sqlQuery, [
      req.params.id,
      book_id,
      req.body.status,
      req.body.review,
      req.body.rating,
    ]);

    res.status(201).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching data",
      error: error.detail,
      errorCode: error.code,
      req: req.body,
    });
  }
});

//Update reading status in a user's shelf
router.put("/user/:id", async (req, res) => {
  try {
    const results = await db.query(
      `UPDATE user_book_relationships 
      SET status = $1 
      WHERE user_id = $2 AND book_id = $3 
      RETURNING *;
      `,
      [req.body.status, req.params.id, req.body.book_id]
    );

    res.status(201).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
