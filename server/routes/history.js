import express from "express";
import { authenticateToken, query } from "../helper.js";


const router = express.Router();

router.post("/history/:number", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const number = req.params.number;

  const checkExistNumInHistorySLQ = `SELECT * FROM ${process.env.DATABASE}.history WHERE user_id = ${userId} AND phone_number = '${number}'`;

  const insererIntoHistorySQL = `INSERT INTO ${process.env.DATABASE}.history (user_id, phone_number) VALUES (${userId}, '${number}')`;
  console.log(number);

  try {
    const isExist = await query(checkExistNumInHistorySLQ);
    if (isExist.length === 0) {
      await query(insererIntoHistorySQL);
      res.sendStatus(201);
    }
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send({ message: err });
  }
});

router.post("/all-history", authenticateToken, async (req, res) => {
  const { page = 1, pageSize = 20 } = req.body;
  const userId = req.user.id;

  const historyQuery = `SELECT COUNT(*) as count FROM ${process.env.DATABASE}.history;`;

  const sql = `SELECT id, phone_number AS number, DATE_FORMAT(created_at, '%d.%m.%Y') AS date FROM ${
    process.env.DATABASE
  }.history WHERE user_id = ${userId} LIMIT ${pageSize} offset ${
    (page - 1) * pageSize
  };`;

  try {
    const items = await query(sql);
    const countResult = await query(historyQuery);

    const totalCount = countResult[0].count;
    const totalPage = Math.ceil(totalCount / pageSize);

    const result = {
      items,
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

router.delete("/history", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const sql = `DELETE FROM ${process.env.DATABASE}.history
		WHERE user_id = ${userId};
	`;
    await query(sql);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

export default router;
