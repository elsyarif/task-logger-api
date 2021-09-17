import express from "express";
import { createTodo, getTodos } from "../controllers/todoController.js";
const todoRouter = express.Router();

todoRouter.post("/", createTodo);
todoRouter.get("/", getTodos);

export default todoRouter;
