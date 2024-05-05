const express = require("express");
const db = require("../db/index.js");
const router = express.Router();
const asyncHandler = require("./services/asyncHandler.js");
const { checkIfBookExists, addBookToTable } = require("./services/books.js");
const fs = require("fs");
const path = require("path");

//Get all reviews
router.get(
  "/",
  asyncHandler(async (res) => {
    const results = await db.query("select * from user_book_relationships;");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  })
);

//Get the latest user action
router.get(
  "/feed",

  asyncHandler(async (req, res) => {
    const sqlFilePath = path.join(
      __dirname,
      "..",
      "SQLs/userBookRelations",
      "latestUserUpdate.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, { encoding: "utf-8" });
    const results = await db.query(sqlQuery);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  })
);

//
//Get all reviews for a specific book
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const sqlFilePath = path.join(
      __dirname,
      "..",
      "SQLs/userBookRelations",
      "bookReviews.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, { encoding: "utf-8" });
    const results = await db.query(sqlQuery, [req.params.id]);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  })
);

//
//Get reading status of the user for a specific book
router.post(
  "/book/:id",
  asyncHandler(async (req, res) => {
    const user_id = req.body.user_id;
    const book_id = req.params.id;

    // try {
    const results = await db.query(
      "SELECT ubr.status FROM user_book_relationships ubr WHERE ubr.google_book_id = $1 AND ubr.user_id = $2;",
      [book_id, user_id]
    );

    if (results.rows.length > 0) {
      res.status(200).json({
        data: results.rows[0],
      });
    } else {
      res.status(200).json({ data: { status: "not added" } });
    }
  })
);

//Get all books for a specific user
router.get(
  "/user/:id",
  asyncHandler(async (req, res) => {
    const sqlFilePath = path.join(
      __dirname,
      "..",
      "SQLs/userBookRelations",
      "booksByUser.sql"
    );
    const sqlQuery = fs.readFileSync(sqlFilePath, { encoding: "utf-8" });

    const results = await db.query(sqlQuery, [req.params.id]);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: results.rows,
    });
  })
);

// Add a book in user's shelf
router.post("/user/:id", async (req, res) => {
  const sqlFilePath = path.join(
    __dirname,
    "..",
    "SQLs/userBookRelations",
    "insertToUBR.sql"
  );
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
router.put(
  "/user/:id",
  asyncHandler(async (req, res) => {
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
  })
);

//Remove a book from an users bookshelf
router.delete(
  "/user/:userId/book/:bookId",
  asyncHandler(async (req, res) => {
    const { userId, bookId } = req.params;

    const result = await db.query(
      "DELETE FROM user_book_relationships WHERE user_id = $1 AND google_book_id = $2",
      [userId, bookId]
    );

    console.log(result.rowCount);

    if (result.rowCount === 0) {
      // No rows were deleted, which means the book was not found in the user's shelf
      return res.status(404).json({
        status: "error",
        message: "Book not found on user's shelf",
      });
    }
    res.status(204).json({
      status: "success",
    });
  })
);

module.exports = router;
