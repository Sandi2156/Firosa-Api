import express from "express";

import projectController from "../controllers/project";
import tryCatch from "../lib/try_catch";
import {
  jwtTokenRequiredWithUserId,
  jwtTokenRequiredWithOID,
} from "../middlewares/authentication";

const projectRouter = express.Router();

projectRouter
  .post(
    "/",
    tryCatch(jwtTokenRequiredWithUserId),
    tryCatch(projectController.deployProject)
  )
  .post(
    "/store",
    tryCatch(jwtTokenRequiredWithOID),
    tryCatch(projectController.storeProject)
  )
  .get(
    "/",
    tryCatch(jwtTokenRequiredWithUserId),
    tryCatch(projectController.getProjects)
  )
  .post(
    "/delete",
    tryCatch(jwtTokenRequiredWithUserId),
    tryCatch(projectController.deleteProject)
  );

export default projectRouter;
