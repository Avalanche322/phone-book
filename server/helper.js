import connection from "./db.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { TypeDangerous, LevelDangerous } from "./enum.js";

dotenv.config();

export function query(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).send({ message: "Користувач не авторизованний " });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: err });
    req.user = user;
    next();
  });
}

export function getTypeDangerous(level) {
  return level <= LevelDangerous.Safe
    ? TypeDangerous.Safe
    : level <= LevelDangerous.Neutral
    ? TypeDangerous.Neutral
    : level <= LevelDangerous.Dangerous
    ? TypeDangerous.Dangerous
    : TypeDangerous.Default;
}

export async function getCommentsByLevelDangerous(number) {
  try {
    const countComments = `SELECT COUNT(*) as count, SUM(CASE WHEN typeDangerous = 0 THEN 1 ELSE 0 END) as safeCount, SUM(CASE WHEN typeDangerous = 1 THEN 1 ELSE 0 END) as neutralCount, SUM(CASE WHEN typeDangerous = 2 THEN 1 ELSE 0 END) as dangerousCount FROM ${process.env.DATABASE}.comments WHERE phone_number = '${number}';`;

    const countResult = await query(countComments);

    const {
      safeCount,
      dangerousCount,
      neutralCount,
      count: totalCount,
    } = countResult[0];

    const safeCountValue = safeCount !== null ? safeCount : 0;
    const dangerousCountValue = dangerousCount !== null ? dangerousCount : 0;
    const neutralCountValue = neutralCount !== null ? neutralCount : 0;
    const totalCountValue = totalCount === 0 ? 1 : totalCount;

    return {
      totalCount,
      safeCountValue,
      dangerousCountValue,
      totalCountValue,
      neutralCountValue,
    };
  } catch (err) {
    throw err;
  }
}

export async function updateLevelDangerous(number) {
  try {
    const { totalCount, safeCountValue, dangerousCountValue, totalCountValue } =
      await getCommentsByLevelDangerous(number);

    let dangerLevel = 0;

	  if (totalCountValue === safeCountValue || totalCount === 0) {
      dangerLevel = 0;
    } else if (totalCountValue === dangerousCountValue && totalCount !== 0) {
      dangerLevel = 100;
    } else if (safeCountValue === dangerousCountValue && totalCount !== 0) {
      dangerLevel = 50;
    } else if(totalCount !== 0) {
      dangerLevel = Math.floor(
        (Math.abs(dangerousCountValue - safeCountValue) / totalCountValue) *
          100,
      );
    }

    const updateDangerLevelQuery = `UPDATE ${process.env.DATABASE}.phone_numbers SET level_dangerous = ${dangerLevel} WHERE number = '${number}';`;
    await query(updateDangerLevelQuery);

    return { totalCount, dangerLevel };
  } catch (err) {
    throw err;
  }
}

export async function checkExistNumber(number) {
  // Перевіряємо наявність номеру телефону в таблиці phones_number
  const checkPhoneNumberQuery = `SELECT * FROM ${process.env.DATABASE}.phone_numbers WHERE number = '${number}';`;
  const phoneNumberResult = await query(checkPhoneNumberQuery);

  return phoneNumberResult.length !== 0;
}
