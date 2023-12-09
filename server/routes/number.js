import express from "express";
import jwt from "jsonwebtoken";
import { TypeSort } from "../enum.js";
import { query, getTypeDangerous } from "../helper.js";

const router = express.Router();

router.post("/all-numbers", async (req, res) => {
  const { page = 1, pageSize = 20, typeSort = TypeSort.Default } = req.body;

  let orderByClause = "ORDER BY last_date_mark DESC"; // default sorting
  switch (typeSort) {
    case TypeSort.DescLevelDangerous:
      orderByClause = "ORDER BY level_dangerous DESC";
      break;
    case TypeSort.AscLevelDangerous:
      orderByClause = "ORDER BY level_dangerous ASC";
      break;
    case TypeSort.DescCountMarks:
      orderByClause = "ORDER BY count_marks DESC";
      break;
    case TypeSort.AscCountMarks:
      orderByClause = "ORDER BY count_marks ASC";
      break;
    default:
      break;
  }

  const countQuery = `SELECT COUNT(*) as count FROM ${process.env.DATABASE}.phone_numbers;`;

  const sql = `SELECT number, level_dangerous, count_marks FROM ${
    process.env.DATABASE
  }.phone_numbers ${orderByClause} LIMIT ${pageSize} offset ${
    (page - 1) * pageSize
  };`;

  try {
    const items = await query(sql);
    const countResult = await query(countQuery);

    const totalCount = countResult[0].count;
    const totalPage = Math.ceil(totalCount / pageSize);

    const result = {
      items: items.map((item) => ({
        ...item,
        typeDangerous: getTypeDangerous(item.level_dangerous),
      })),
      pagination: {
        totalPage,
        totalCount,
      },
    };

    res.status(200).send(result);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send({ message: err });
  }
});

router.get("/number-info/:number", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send({ message: err });
      req.user = user;
    });
  }

  const number = req.params.number;
  const userId = req.user ? req.user.id : null; // assuming user ID is stored in req.user.id

  const sql = `SELECT number, level_dangerous, count_marks, DATE_FORMAT(last_date_mark, '%d.%m.%Y') as last_date_mark FROM ${process.env.DATABASE}.phone_numbers WHERE number = '${number}';`;

  let isFavoriteNumSql;
  if (userId) {
    isFavoriteNumSql = `SELECT COUNT(*) as count FROM ${process.env.DATABASE}.favorites WHERE user_id = ${userId} AND phone_number = '${number}';`;
  }

  try {
    const numberInfo = await query(sql);
    let isFavoriteNum = false;
    if (userId) {
      const result = await query(isFavoriteNumSql);
      isFavoriteNum = result[0].count > 0;
    }

    const response = {
      ...numberInfo[0],
      isFavoriteNum,
      typeDangerous: getTypeDangerous(numberInfo[0]?.level_dangerous),
    };

    res.status(200).send(response);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send({ message: err });
  }
});

router.get("/number-search/:number", async (req, res) => {
  try {
    const number = req.params.number;

    const sql = `
			SELECT number, level_dangerous
			FROM ${process.env.DATABASE}.phone_numbers
			WHERE number LIKE '%${number}%' ORDER BY last_date_mark DESC LIMIT 10`;

    const items = await query(sql);

    const result = items.map((item) => ({
      ...item,
      typeDangerous: getTypeDangerous(item.level_dangerous),
    }));
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

export default router;
