import db from "../client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async ({ name, username, password }) => {
  const securePassword = await bcrypt.hash(password, 10);
  const sql = `
      INSERT INTO users (name, username, password)
      VALUES ($1, $2, $3)
      RETURNING username
   `;

  const { rows: [user] } = await db.query(sql, [name, username, securePassword]);
  const token = jwt.sign({user}, process.env.JWT_SECRET);
  return token;
};

