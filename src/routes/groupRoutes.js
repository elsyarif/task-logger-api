import express from "express";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
} from "../controllers/groupController.js";

const groupRouter = express.Router();

groupRouter.post("/", createGroup);
groupRouter.get("/", getGroups);
groupRouter.get("/:id", getGroupById);
groupRouter.delete("/:id", deleteGroup);

export default groupRouter;
