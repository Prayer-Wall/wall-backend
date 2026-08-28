import express from "express";
import { getUserIdByToken } from "../db/queries/users.js";
import { createPrayer, getWallPrayers } from "../db/queries/prayers.js";

const prayerRouter = express.Router();
export default prayerRouter 

prayerRouter.use(express.json());

prayerRouter.use(async (req, res, next) => {
   const authorization = req.get("authorization");
   if (!authorization || !authorization.startsWith("Bearer ")) return next();

   const token = authorization.split(" ")[1];
   try {
      const userId = await getUserIdByToken(token);
      req.userId = userId;
      next();
   } catch (e) {
      console.log(e)
      res.status(401).json({message: "Invalid token"})
   }
})

prayerRouter.get('/', async (req, res, next) => {
   try {
      const prayers = await getWallPrayers(req.userId);
      res.status(200).send(prayers);
   } catch (e) {
      console.log(e);
      next();
   }
});

prayerRouter.post('/', async (req,res,next) => {
   const {prayer} = req.body;

   if (!prayer) return res.status(400).json({message: "Must include prayer in body"});
   try {
      await createPrayer(req.userId, prayer);
      res.status(201).send("Prayer added successfully!")
   } catch (e) {
      console.log(e)
      next()
   }
})