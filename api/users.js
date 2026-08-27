import express from "express";
import { createUser, authenticateUser, usernameExists } from "../db/queries/users.js";

const userRouter = express.Router();
export default userRouter;

userRouter.use(express.json());

// username case handling middleware
userRouter.use((req, res, next) => {
   if (req.body.username) {
      req.body.username = req.body.username.toLowerCase();
      next()
   } else {
      next()
   }
})

userRouter.post('/register', async (req, res, next) => {
   try {
      const {name, username, password} = req.body;

      if (!name || !username || !password) return res.status(400).json({message: "Body must include all fields on registration form"});
      await usernameExists(username);
      const token = await createUser(req.body);
      res.status(201).send({token});
   } catch (e) {
      res.status(400).json({message: e.message});
   }

});

userRouter.post(`/login`, async (req, res, next) => {
   try {
      const {username, password} = req.body;
      
      if (!username || !password) return res.status(400).json({message: "Body must include all fields on form"});
      const token = await authenticateUser(req.body);
      res.send({token});
   } catch (e) {
      console.log(e.message)
      res.status(401).json({message: e.message});
   }
})