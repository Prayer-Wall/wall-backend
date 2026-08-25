import express from "express";
import { createUser, authenticateUser, usernameExists } from "../db/queries/users.js";

const userRouter = express.Router();
export default userRouter;

userRouter.use(express.json());

userRouter.post('/register', async (req, res, next) => {
   try {
      const {name, username, password} = req.body;
   
      if (!name || !username || !password) return res.status(400).send("Body must include all fields or registration form");
      await usernameExists(req.body.username);
      const token = await createUser(req.body);
      res.status(201).send(token);
   } catch (e) {
      res.status(400).send(e.message)
   }

});

userRouter.post(`/login`, async (req, res, next) => {
   try {
      const {username, password} = req.body;
      
      if (!username || !password) return res.status(400).send("Body must include all fields or registration form");
      const token = await authenticateUser(req.body);
      res.send(token);
   } catch (e) {
      res.status(401).send(e.message);
   }
})