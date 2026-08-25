import express from "express";
import { createUser, authenticateUser, usernameExists } from "../db/queries/users.js";

const userRouter = express.Router();
export default userRouter;

userRouter.use(express.json());

userRouter.post('/register', async(req, res, next) => {
   const {name, username, password} = req.body;

   if (!name || !username || !password) return res.status(400).send("Body must include all fields or registration form");
   const isUser = await usernameExists(req.body.username);
   if (isUser) {
      res.status(400).send("Username unavailable")
   }
   const token = await createUser(req.body);
   res.status(201).send(token);
})