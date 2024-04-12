require("dotenv").config();
const express = require("express");
const db = require("./db/index.js");
const booksRoute = require("./routes/booksRoute.js");
const usersRoute = require("./routes/usersRoute.js");
const reviewsRoute = require("./routes/reviewsRoute.js");
const cors = require("cors");
// config();
// const morgan = require("morgan");

const app = express();

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
//Middleware for CORS policy to allow custom origins
app.use(cors());
app.use("/api/v1/books", booksRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/reviews", reviewsRoute);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    status: "error",
    message: error.message || "Internal Server Error",
  });
});

app.listen(4000, () => {
  console.log(`server is listening on port ${port}`);
});
