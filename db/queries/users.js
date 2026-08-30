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
  const token = jwt.sign({username: user.username}, process.env.JWT_SECRET);
  return token;
};

export const usernameExists = async (username) => {
  const sql = `
    SELECT * FROM users
    WHERE users.username = $1
  `;

  const {rows: [isUser]} = await db.query(sql, [username]);
  if (isUser) throw new Error("Username unavailable");
  return
}

export const authenticateUser = async ({username, password}) => {
  const sql = `
    SELECT * FROM users
    WHERE users.username = $1
  `

  let validPassword = false;
  let token = null;
  const {rows: [user]} = await db.query(sql, [username]);

  if (user) {
    validPassword = await bcrypt.compare(password, user.password);
  } else {
    throw new Error("Invalid username or password");
  }
  if (validPassword) {
    token = jwt.sign({username}, process.env.JWT_SECRET);
  } else {
    throw new Error("Invalid username or password");
  }
  return token;
}

export const getUserIdByToken = async (token) => {
  const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
  const sql = `
    SELECT * FROM users
    WHERE users.username = $1
  `;

  const {rows: [user]} = await db.query(sql, [tokenInfo.username]);
  return user.id
}