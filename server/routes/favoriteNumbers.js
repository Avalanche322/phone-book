import express from "express";
import { authenticateToken, query } from "../helper.js";

const router = express.Router();

router.post("/favorite-numbers", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { number } = req.body;

    const checkSql = `SELECT id FROM ${process.env.DATABASE}.favorites WHERE user_id = ${userId} AND phone_number = '${number}'`;
    const [existingFavorite] = await query(checkSql);

    if (existingFavorite) {
      return res.status(409).send({ message: "Номер вже в збереженних" });
    }

    const sql = `INSERT INTO ${process.env.DATABASE}.favorites (user_id, phone_number) VALUES (${userId}, '${number}');`;
    await query(sql);

    res.status(201).send({ isFavoriteNum: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

router.delete(
  "/favorite-numbers/:number",
  authenticateToken,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const number = req.params.number;

      const { page = 1, pageSize = 20 } = req.body;

      const sql = `DELETE FROM ${process.env.DATABASE}.favorites
		WHERE user_id = ${userId}
		AND phone_number = '${number}';
	`;
      const favoriteNumbersQuery = `SELECT COUNT(*) as count FROM ${process.env.DATABASE}.favorites;`;

      const favoritesNumbersQuery = `SELECT id, phone_number AS number, DATE_FORMAT(created_at, '%d.%m.%Y') AS date FROM ${
        process.env.DATABASE
      }.favorites WHERE user_id = ${userId} LIMIT ${pageSize} offset ${
        (page - 1) * pageSize
      };`;
      await query(sql);
      const items = await query(favoritesNumbersQuery);
      const countResult = await query(favoriteNumbersQuery);

      const totalCount = countResult[0].count;
      const totalPage = Math.ceil(totalCount / pageSize);

      const result = {
        items,
        pagination: {
          totalPage,
          totalCount,
        },
      };

      res.status(201).send({ ...result, isFavoriteNum: false });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err });
    }
  },
);

router.post("/all-favorite-numbers", authenticateToken, async (req, res) => {
  const { page = 1, pageSize = 20 } = req.body;
  const userId = req.user.id;

  const favoriteNumbersQuery = `SELECT COUNT(*) as count FROM ${process.env.DATABASE}.favorites;`;

  const sql = `SELECT id, phone_number AS number, DATE_FORMAT(created_at, '%d.%m.%Y') AS date FROM ${
    process.env.DATABASE
  }.favorites WHERE user_id = ${userId} LIMIT ${pageSize} offset ${
    (page - 1) * pageSize
  };`;

  try {
    const items = await query(sql);
    const countResult = await query(favoriteNumbersQuery);

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
