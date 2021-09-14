import express from "express";

const userRouter = express.Router();

userRouter.post("/users", (req, res) => {
  res.send("User Routes");
});

export default userRouter;
