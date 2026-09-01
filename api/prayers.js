import express from "express";
import { getUserIdByToken } from "../db/queries/users.js";
import { createPrayer, deletePrayerById, editPrayerById, getPrayerById, getUserIdByPrayerId, getWallPrayers } from "../db/queries/prayers.js";

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
});

prayerRouter.get('/', async (req, res, next) => {
   try {
      const prayers = await getWallPrayers(req.userId);
      res.status(200).send(prayers);
   } catch (e) {
      console.log(e);
      next();
   }
});

prayerRouter.get(`/:id`, async (req, res, next) => {
   try {
      const prayerId = req.params.id;
      const prayer = await getPrayerById(prayerId);
      res.status(200).send(prayer)
   } catch (e) {
      console.log(e);
      next();
   }
})

prayerRouter.post('/add', async (req,res,next) => {``
   const {prayer} = req.body;

   if (!prayer) return res.status(400).json({message: "Must include prayer in body"});
   try {
      await createPrayer(req.userId, prayer);
      res.status(201).json({message: "Prayer added successfully!"})
   } catch (e) {
      console.log(e)
      next()
   }
});

prayerRouter.put('/:id', async(req, res, next) => {
   const {id} = req.params;
   const {prayer} = req.body;
   
   if (!prayer || !id) return res.status(400).json({message: "Must include prayer and id in body"});
   try {
      const prayersUser = await getUserIdByPrayerId(id);
      if (req.userId !== prayersUser) {
         throw new Error("You are not authorized to update this prayer!");
      }
      await editPrayerById(id, prayer);
      res.status(200).json({message: "Prayer upated successfully!"});
   } catch (e) {
      console.log(e)
      next()
   }
});

prayerRouter.delete('/:id', async(req, res, next) => {
   const {id} = req.params;

   if (!id) return res.status(400).json({message: "Must include id in body"});
   try {
      const prayersUser = await getUserIdByPrayerId(id);
      if (req.userId !== prayersUser) {
         throw new Error("You are not authorized to update this prayer!");
      }
      await deletePrayerById(id);
      res.status(200).json({message: "Prayer deleted successfully!"});
   } catch (e) {
      console.log(e)
      next()
   }
})