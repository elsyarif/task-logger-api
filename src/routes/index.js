import express from "express";

const routes = express();

//  routes collection
import UserRoutes from "./usersRoutes.js";
import GroupRoutes from './groupRoutes.js'

routes.use('/api/', UserRoutes);
routes.use('/api/', GroupRoutes);

export default routes;
