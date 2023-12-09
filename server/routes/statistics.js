import express from "express";
import { query } from "../helper.js";

const router = express.Router();

router.get("/statistics", async (req, res) => {
  const sql = `SELECT 
	IFNULL(
		ROUND(SUM(CASE WHEN level_dangerous >= 60 THEN 1 ELSE 0 END) / COUNT(*) * 100),
		0
	) AS dangerous,
	IFNULL(
		ROUND(SUM(CASE WHEN level_dangerous >= 40 AND level_dangerous < 60 THEN 1 ELSE 0 END) / COUNT(*) * 100),
		0
	) AS neutral,
	IFNULL(
		ROUND(SUM(CASE WHEN level_dangerous < 40 THEN 1 ELSE 0 END) / COUNT(*) * 100),
		0
	) AS safe
FROM 
	${process.env.DATABASE}.phone_numbers;
`;

  try {
    const statistics = await query(sql);
    res.status(200).send(statistics[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send({ message: err });
  }
});

export default router;
