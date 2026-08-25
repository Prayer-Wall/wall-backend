import express from "express";
import { getUserIdByToken } from "../db/queries/users.js";
import { getWallPrayers } from "../db/queries/prayers.js";

const prayerRouter = express.Router();
export default prayerRouter 

prayerRouter.use(express.json());

prayerRouter.get('/', async (req, res, next) => {
   const authorization = req.get("authorization");
   if (!authorization || !authorization.startsWith("Bearer ")) return next();

   const token = authorization.split(" ")[1];
   try {
      const userId = await getUserIdByToken(token);
      const prayers = await getWallPrayers(userId);
      console.log(userId);
      console.log("Sever side: ", prayers);
      res.status(200).send(prayers);
   } catch (e) {
      console.log(e);
      next();
   }
})