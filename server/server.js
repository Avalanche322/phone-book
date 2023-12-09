import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connection from "./db.js";

import favoriteNumbers from "./routes/favoriteNumbers.js";
import history from "./routes/history.js";
import comments from "./routes/comments.js";
import number from "./routes/number.js";
import numberCodes from "./routes/numberCodes.js";
import statistics from "./routes/statistics.js";
import user from "./routes/user.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.use(favoriteNumbers);
app.use(history);
app.use(comments);
app.use(number);
app.use(user);
app.use(statistics);
app.use(numberCodes);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database!");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

app.use((req, res) => {
  res.status(404).send("404");
});
