import express, { Response, Request } from "express";
import projectRouter from "./project";
import userRouter from "./user";
import authMiddleware from "../middlewares/authentication";
import errorHandlerMiddleware from "../middlewares/error_handler";
import tryCatch from "../lib/try_catch";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({
    app: "vercel clone",
    version: "1.0.0",
  });
});

router.use("/v1/project", tryCatch(authMiddleware), projectRouter);
router.use("/v1/user", userRouter);
router.use(errorHandlerMiddleware);

export default router;
