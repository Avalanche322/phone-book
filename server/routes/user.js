import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { query, authenticateToken } from "../helper.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // check if user already exists
  const userExistsQuery = `SELECT * FROM users WHERE email='${email}'`;
  const userExists = await query(userExistsQuery);
  if (userExists.length > 0) {
    return res
      .status(400)
      .json({ message: "Користувач з такою поштою вже існує" });
  }

  // hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // insert new user into database
  const insertUserQuery = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`;
  const result = await query(insertUserQuery);

  const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET);
  res.status(200).send({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const userExistsQuery = `SELECT * FROM users WHERE email='${email}'`;
  const userExists = await query(userExistsQuery);
  if (userExists.length === 0) {
    return res.status(400).json({ message: "Користуача не знайденно" });
  }

  // check if password is correct
  const user = userExists[0];
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Не правильний пароль" });
  }

  // generate JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.status(200).json({ token });
});

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const sql = `SELECT email, username FROM ${process.env.DATABASE}.users WHERE id='${userId}'`;
    const result = await query(sql);
    if (result.length === 0) {
      res.status(404).send({ message: "Користувача не знайденно" });
    } else {
      const user = result[0];
      res.send(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

export default router;
