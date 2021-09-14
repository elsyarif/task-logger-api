import express from "express";

const routes = express();

//  routes collection
import UserRoutes from "./usersRoutes.js";

routes.use(UserRoutes);

export default routes;
