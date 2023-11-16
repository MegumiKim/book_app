import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing request body
app.use(express.json());
//Middleware for CORS policy to allow custom origins
app.use(
  cors()
  // cors({
  //   origin: "http://localhost:3000",
  //   method: ["GET", "POST", "PUT", "DELETE"],
  //   allowedHeaders: ["Content-Type"],
  // })
);

//Route for books
app.use("/books", booksRoute);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("app connected to DB");
    app.listen(PORT, () => {
      console.log(`App listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
