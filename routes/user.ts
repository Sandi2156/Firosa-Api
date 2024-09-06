import express from "express";

import tryCatch from "../lib/try_catch";
import userController from "../controllers/user";
import { jwtTokenRequiredWithUserId } from "../middlewares/authentication";

const userRouter = express.Router();

userRouter
  .post("/signup", tryCatch(userController.signUp))
  .post("/signin", tryCatch(userController.signIn))
  .post("/signout", tryCatch(userController.signOut))
  .post(
    "/validate-session",
    tryCatch(jwtTokenRequiredWithUserId),
    tryCatch(userController.validateSession)
  );

export default userRouter;
