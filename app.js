import express from "express";
import userRouter from "./api/users.js";
const app = express();
export default app;

app.use('/users', userRouter);

app.use((err, req, res, next) => {
   console.log(err.message);
   res.status(500).send('Something went wrong')
}) 