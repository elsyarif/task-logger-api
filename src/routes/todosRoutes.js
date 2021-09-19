import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getTodosById,
  updateStatusTodo,
} from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.post("/", createTodo);
todoRouter.get("/", getTodos);
todoRouter.get("/:id", getTodosById);
todoRouter.patch("/:id", updateStatusTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
