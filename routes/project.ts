import express from "express";

import projectController from "../controllers/project";
import tryCatch from "../lib/try_catch";

const projectRouter = express.Router();

projectRouter
  .post("/", tryCatch(projectController.deployProject))
  .post("/store", tryCatch(projectController.storeProject))
  .get("/", tryCatch(projectController.getProjects));

export default projectRouter;
