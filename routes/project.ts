import express from "express";
import { deployProject } from "../controllers/project";

const projectRouter = express.Router();

projectRouter.post("/", deployProject);

export default projectRouter;
