const express = require("express");
const db = require("../db/index.js");
const router = express.Router();

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
  try {
    const results = await db.query(
      "select * from user_book_relationships WHERE book_id = $1;",
      [req.params.id]
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

//Get all books for a specific user
router.get("/user/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select * from user_book_relationships WHERE user_id = $1;",
      [req.params.id]
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

// Add a book in user's shelf
router.post("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO user_book_relationships(user_id, book_id, status, review, rating, read_date) VALUES ($1, $2, $3, $4, $5, $6) returning *;",
      [
        req.body.user_id,
        req.params.id,
        req.body.status,
        req.body.review,
        req.body.rating,
        req.body.read_date,
      ]
    );

    res.status(201).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
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
