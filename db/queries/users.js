import db from "../client.js";
import bcrypt from "bcrypt";

export const createUser = async ({ name, username, password }) => {
  const securePassword = await bcrypt.hash(password, 10);
  const sql = `
      INSERT INTO users (name, username, password)
      VALUES ($1, $2, $3)
      RETURNING id, username
   `;

  const { rows: [user] } = await db.query(sql, [name, username, securePassword]);
  console.log(user);
  return user;
};

