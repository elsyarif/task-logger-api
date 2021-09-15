import express from "express";
import { createGroup } from "../controllers/groupController.js";

const groupRouter = express.Router();

groupRouter.post("/group", createGroup);

export default groupRouter;
