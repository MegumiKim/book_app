const express = require("express");
const db = require("../db/index.js");
const router = express.Router();

//get all users
router.get("/", async (req, res) => {
  try {
    const results = await db.query("select * from users;");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      users: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//Get a single user by id
router.get("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM users WHERE id = $1",
      // "select * from books left join (select books_id, count(*), TRUNC(AVG(rating),1) as average_rating from reviews group by books_id) reviews on books.id = reviews.books_id WHERE id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//Create an user
router.post("/", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO users(name, password) values ($1, $2) returning *;",
      // "INSERT INTO books (name, location, price_range) VALUES ($1, $2, $3) returning *;",
      [req.body.name, req.body.password]
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

//Delete
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

// // get books in an user's shelf
// router.get("/books:id", async (req, res) => {
//   try {
//     const results = await db.query("select * from users;");

//     res.status(200).json({
//       status: "success",
//       results: results.rows.length,
//       users: results.rows,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
