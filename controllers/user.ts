import { Request, Response } from "express";

import userService from "../services/user";
import { AppError, ValidationError } from "../lib/exceptions";
import errorCodes from "../constants/error_codes";
import ApiResposne from "../lib/response";

async function signUp(req: Request, res: Response) {
  const email = req.body.email?.toLowerCase();
  const password = req.body.password;
  const firstName = req.body?.firstName || "";
  const lastName = req.body?.lastName || "";

  if (!email) throw new ValidationError("Email field is required!");
  if (!password) throw new ValidationError("Password field is required!");

  await userService.signUp(email, password, firstName, lastName);

  res.status(201).json(new ApiResposne(true, "User is created!").toDict());
}

async function signIn(req: Request, res: Response) {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email) throw new ValidationError("Email field is required!");

  if (!password) throw new ValidationError("Password field is required!");

  const sessionId = await userService.signIn(email, password);

  return res
    .cookie("sessionId", sessionId, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    })
    .status(200)
    .json(new ApiResposne(true, "You are signed in successfully!").toDict());
}

async function signOut(req: Request, res: Response) {
  const sessionId = req.cookies?.sessionId;

  if (!sessionId)
    throw new AppError(
      errorCodes.BAD_REQUEST,
      "You are not logged in anyway!",
      400
    );

  await userService.signOut(sessionId);

  return res
    .status(200)
    .json(new ApiResposne(true, "You are signed out!").toDict());
}

export default {
  signUp,
  signIn,
  signOut,
};
