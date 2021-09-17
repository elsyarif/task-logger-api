import express from "express";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
} from "../controllers/groupController.js";

const groupRouter = express.Router();

groupRouter.post("/group", createGroup);
groupRouter.get("/group", getGroups);
groupRouter.get("/group/:id", getGroupById);
groupRouter.delete("/group/:id", deleteGroup);

export default groupRouter;
