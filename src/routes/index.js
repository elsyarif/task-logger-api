import express from "express";

const routes = express();
import { protect } from "../middleware/authMiddleware.js";
//  routes collection
import UserRoutes from "./usersRoutes.js";
import GroupRoutes from "./groupRoutes.js";
import TodoRoutes from "./todosRoutes.js";

routes.use("/v1/api/user", UserRoutes);
routes.use("/v1/api/group", GroupRoutes);
routes.use("/v1/api/todo", protect, TodoRoutes);

export default routes;
