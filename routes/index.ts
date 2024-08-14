import express from "express";
import projectRouter from "./project";

const router = express.Router();

router.use("/v1/project", projectRouter);

export default router;
