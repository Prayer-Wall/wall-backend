import db from "../client.js";
import bcrypt from "bcrypt";

export const createUser = async ({ username, password }) => {
  const securePassword = await bcrypt.hash(password, 10);
  const sql = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id, username
   `;

  const { rows: [user] } = await db.query(sql, [username, securePassword]);
  console.log(user);
  return user;
};

