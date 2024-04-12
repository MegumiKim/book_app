const db = require("../../db/index.js");

/**
 * Checks if a book with the given Google Book ID exists in the database.
 * @param {string} google_book_id The Google Book ID to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the book exists, false otherwise.
 */
async function checkIfBookExists(google_book_id) {
  try {
    const query = "SELECT 1 FROM books WHERE google_book_id = $1 LIMIT 1;";
    const values = [google_book_id];
    const result = await db.query(query, values);
    console.log(result);

    // Check if any rows are returned
    return result.rows.length > 0;
  } catch (error) {
    console.error("Error checking if book exists:", error);
    // Optionally, re-throw the error or handle it as per your application's error handling policy
    throw error;
  }
}

async function addBookToTable(body) {
  console.log("this is body", body);
  try {
    const query =
      "INSERT INTO books (google_book_id, title, author, imageurl, genre) VALUES ($1, $2, $3, $4, $5) returning *;";
    const values = [
      body.google_book_id,
      body.title,
      body.author,
      body.imageUrl,
      body.genre,
    ];
    const result = await db.query(query, values);
    // console.log("result", result);
  } catch (error) {
    console.error("Failed to create book", error);
    // Optionally, re-throw the error or handle it as per your application's error handling policy
    throw error;
  }
}
module.exports = { checkIfBookExists, addBookToTable };
