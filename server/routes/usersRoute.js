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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Query to check if a user with the given username and password exists
    const query =
      "SELECT user_id, name FROM users WHERE name = $1 AND password = $2;";
    const results = await db.query(query, [username, password]);

    // If the query finds a user, it means the login credentials are correct
    if (results.rows.length > 0) {
      const user = results.rows[0];
      res.status(200).json({
        status: "success",
        data: {
          user_id: user.user_id,
          name: user.name,
        },
      });
    } else {
      // If no user is found, it means the credentials are incorrect
      // You can choose to send a more specific error code here, such as 401 for unauthorized
      res.status(401).json({
        status: "fail",
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during the login process",
    });
  }
});

//Create an user / Sign up
router.post("/", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO users(name, password) values ($1, $2) returning *;",
      // "INSERT INTO books (name, location, price_range) VALUES ($1, $2, $3) returning *;",
      [req.body.name, req.body.password]
    );
    const user = results.rows[0];
    res.status(201).json({
      status: "success",
      data: {
        user_id: user.user_id,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(409).json({
      status: "fail",
      error: error.detail,
      errorCode: error.code,
      message: "Username already exists",
    });
  }
});

module.exports = router;

//Delete
router.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  if (userId === 40) {
    res.status(400).send("Error: You cannot delete this account.");
    return; // Stop further execution
  }

  try {
    const result = await db.query("DELETE FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (result.rowCount === 0) {
      res.status(404).send("User not found.");
    } else {
      res.send("User deleted successfully.");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Failed to delete user.");
  }
});
