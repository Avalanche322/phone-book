import express from "express";
import jwt from "jsonwebtoken";
import { TypeDangerous } from "../enum.js";
import {
  authenticateToken,
  query,
  updateLevelDangerous,
  checkExistNumber,
  getCommentsByLevelDangerous,
  getTypeDangerous,
} from "../helper.js";


const router = express.Router();

router.post("/comment", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      number,
      comment,
      typeDangerous,
      page = 1,
      pageSize = 20,
    } = req.body;

    // Якщо номер телефону не знайдено, то створюємо його в таблиці phones_number
    const isExistNumber = await checkExistNumber(number);
    if (!isExistNumber) {
      const createPhoneNumberQuery = `INSERT INTO ${process.env.DATABASE}.phone_numbers (number, count_marks, level_dangerous) VALUES ('${number}', 0, 0);`;
      await query(createPhoneNumberQuery);
    }

    const sql = `INSERT INTO ${process.env.DATABASE}.comments (user_id, phone_number, comment, typeDangerous) VALUES (${userId}, '${number}', '${comment}', ${typeDangerous});`;
    await query(sql);

    const allCommentsQuery = `SELECT id, user_id, comment, DATE_FORMAT(created_at, '%d.%m.%Y') AS date, typeDangerous FROM ${
      process.env.DATABASE
    }.comments WHERE phone_number = '${number}' LIMIT ${pageSize} offset ${
      (page - 1) * pageSize
    };`;

    const { totalCount, dangerLevel } = await updateLevelDangerous(number);

    const updatePhoneNumberQuery = `UPDATE ${process.env.DATABASE}.phone_numbers SET last_date_mark = NOW(), count_marks = ${totalCount} WHERE number = '${number}';`;
    await query(updatePhoneNumberQuery);

    const items = await query(allCommentsQuery);

    const totalPage = Math.ceil(totalCount / pageSize);

    const { safeCountValue, dangerousCountValue, neutralCountValue } =
      await getCommentsByLevelDangerous(number);

    const result = {
      items: items.map((item) => {
        const { user_id, ...rest } = item;
        return { createdByUser: user_id === userId, ...rest };
      }),
      pagination: {
        totalPage,
        totalCount,
      },
      filterSettings: {
        safeCount: safeCountValue,
        dangerousCount: dangerousCountValue,
        neutralCount: neutralCountValue,
      },
      dangerLevel,
      typeDangerous: getTypeDangerous(dangerLevel),
    };
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

router.post("/all-comments", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ message: err });
        req.user = user;
      });
    }

    const userId = req.user ? req.user.id : null;
    const {
      page = 1,
      pageSize = 20,
      number,
      typeFilter = TypeDangerous.Default,
    } = req.body;

    let filterByClause = "";
    switch (typeFilter) {
      case TypeDangerous.Safe:
        filterByClause = `AND typeDangerous = ${TypeDangerous.Safe}`;
        break;
      case TypeDangerous.Neutral:
        filterByClause = `AND typeDangerous = ${TypeDangerous.Neutral}`;
        break;
      case TypeDangerous.Dangerous:
        filterByClause = `AND typeDangerous = ${TypeDangerous.Dangerous}`;
        break;
      default:
        break;
    }

    const countComments = `SELECT COUNT(*) as count FROM ${process.env.DATABASE}.comments WHERE phone_number = '${number}';`;

    const sql = `SELECT id, user_id, comment, DATE_FORMAT(created_at, '%d.%m.%Y') AS date, typeDangerous FROM ${
      process.env.DATABASE
    }.comments WHERE phone_number = '${number}' ${filterByClause} LIMIT ${pageSize} offset ${
      (page - 1) * pageSize
    };`;

    const items = await query(sql);
    const countResult = await query(countComments);

    const totalCount = countResult[0].count;
    const totalPage = Math.ceil(totalCount / pageSize);

    const { safeCountValue, dangerousCountValue, neutralCountValue } =
      await getCommentsByLevelDangerous(number);

    const result = {
      items: items.map((item) => {
        const { user_id, ...rest } = item;
        return { createdByUser: user_id === userId, ...rest };
      }),
      pagination: {
        totalPage,
        totalCount,
      },
      filterSettings: {
        safeCount: safeCountValue,
        dangerousCount: dangerousCountValue,
        neutralCount: neutralCountValue,
      },
    };
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

router.delete("/comment/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { page = 1, pageSize = 20, number } = req.body;

    const deleteCommentQuery = `DELETE FROM ${process.env.DATABASE}.comments
		WHERE user_id = ${userId}
		AND id = ${id};
	`;
    const allCommentsQuery = `SELECT id, user_id, comment, DATE_FORMAT(created_at, '%d.%m.%Y') AS date, typeDangerous FROM ${
      process.env.DATABASE
    }.comments WHERE phone_number = '${number}' LIMIT ${pageSize} offset ${
      (page - 1) * pageSize
    };`;
    await query(deleteCommentQuery);

    const { totalCount, dangerLevel } = await updateLevelDangerous(number);

    const updatePhoneNumberQuery = `UPDATE ${process.env.DATABASE}.phone_numbers SET count_marks = ${totalCount} WHERE number = '${number}';`;
    await query(updatePhoneNumberQuery);

    const items = await query(allCommentsQuery);

    const totalPage = Math.ceil(totalCount / pageSize);

    const { safeCountValue, dangerousCountValue, neutralCountValue } =
      await getCommentsByLevelDangerous(number);

    const result = {
      items: items.map((item) => {
        const { user_id, ...rest } = item;
        return { createdByUser: user_id === userId, ...rest };
      }),
      pagination: {
        totalPage,
        totalCount,
      },
      filterSettings: {
        safeCount: safeCountValue,
        dangerousCount: dangerousCountValue,
        neutralCount: neutralCountValue,
      },
      dangerLevel,
      typeDangerous: getTypeDangerous(dangerLevel),
    };
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

router.post("/my-comments", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, pageSize = 20 } = req.body;

    const countComments = `SELECT COUNT(*) as count FROM ${process.env.DATABASE}.comments WHERE user_id = ${userId};`;

    const sql = `SELECT id, phone_number as number, comment, DATE_FORMAT(created_at, '%d.%m.%Y') AS date, typeDangerous FROM ${
      process.env.DATABASE
    }.comments WHERE user_id = ${userId} LIMIT ${pageSize} offset ${
      (page - 1) * pageSize
    };`;

    const items = await query(sql);
    const countResult = await query(countComments);

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
    console.error(err);
    res.status(500).send({ message: err });
  }
});

export default router;