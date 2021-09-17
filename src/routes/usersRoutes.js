import express from "express";

const userRouter = express.Router();
import { userAuth, userRegister } from "../controllers/usersController.js";

userRouter.post("/register", userRegister);
userRouter.post("/auth", userAuth);

export default userRouter;
