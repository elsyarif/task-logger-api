import express from "express";

const routes = express();
import { protect } from "../middleware/authMiddleware.js";
//  routes collection
import UserRoutes from "./usersRoutes.js";
import GroupRoutes from "./groupRoutes.js";
import TodoRoutes from "./todosRoutes.js";

routes.use("/api/user", UserRoutes);
routes.use("/api/group", GroupRoutes);
routes.use("/api/todo", protect, TodoRoutes);

export default routes;
