import express from "express";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
  updateStatusGroup,
} from "../controllers/groupController.js";

import { protect } from "../middleware/authMiddleware.js";

const groupRouter = express.Router();

groupRouter.post("/",protect, createGroup);
groupRouter.get("/", getGroups);
groupRouter.get("/:id",protect, getGroupById);
groupRouter.delete("/:id", protect, deleteGroup);
groupRouter.patch("/:id", protect, updateStatusGroup);
groupRouter.put("/:id", protect, updateGroup);

export default groupRouter;
