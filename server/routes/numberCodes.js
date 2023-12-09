import express from "express";
import { query } from "../helper.js";

const router = express.Router();

router.post("/number-codes", async (req, res) => {
  const { page = 1, pageSize = 20, search = "" } = req.body;

  let searchQuery = "";
  if (search.length) {
    searchQuery = `WHERE code LIKE '%${search}%' OR LOWER(title) LIKE '%${search}%'`;
  }

  const sql = `SELECT * FROM ${
    process.env.DATABASE
  }.number_codes ${searchQuery} ORDER BY code LIMIT ${pageSize} offset ${
    (page - 1) * pageSize
  };`;

  const countSql = `SELECT COUNT(*) as count FROM ${process.env.DATABASE}.number_codes ${searchQuery}`;

  try {
    const items = await query(sql);
    const countResult = await query(countSql);

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

export default router;
