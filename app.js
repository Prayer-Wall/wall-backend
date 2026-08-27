import express from "express";
import cors from "cors";
import userRouter from "./api/users.js";
import prayerRouter from "./api/prayers.js";
const app = express();
export default app;

app.use(cors({origin: "http://localhost:5173"}))

app.use('/api/users', userRouter);
app.use('/api/prayers', prayerRouter);

app.use((err, req, res, next) => {
   console.log(err.message);
   res.status(500).send('Something went wrong')
}) 