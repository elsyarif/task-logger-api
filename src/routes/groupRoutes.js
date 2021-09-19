import express from "express";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
  updateStatusGroup,
} from "../controllers/groupController.js";

const groupRouter = express.Router();

groupRouter.post("/", createGroup);
groupRouter.get("/", getGroups);
groupRouter.get("/:id", getGroupById);
groupRouter.delete("/:id", deleteGroup);
groupRouter.patch("/:id", updateStatusGroup);
groupRouter.put("/:id", updateGroup);

export default groupRouter;
