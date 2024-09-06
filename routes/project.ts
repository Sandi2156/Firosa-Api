import express from "express";

import projectController from "../controllers/project";
import tryCatch from "../lib/try_catch";
import authMiddleware from "../middlewares/authentication";

const projectRouter = express.Router();

projectRouter
  .post(
    "/",
    tryCatch(authMiddleware),
    tryCatch(projectController.deployProject)
  )
  .post("/store", tryCatch(projectController.storeProject))
  .get("/", tryCatch(authMiddleware), tryCatch(projectController.getProjects));

export default projectRouter;
