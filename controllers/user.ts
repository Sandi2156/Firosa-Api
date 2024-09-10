import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import userService from "../services/user";
import { ValidationError } from "../lib/exceptions";
import ApiResposne from "../lib/response";
import appConfig from "../config/common";
import { SignedUpBy } from "../constants/common";

async function signUp(req: Request, res: Response) {
  const email = req.body.email?.toLowerCase();
  const password = req.body.password;
  const firstName = req.body?.firstName || "";
  const lastName = req.body?.lastName || "";
  const signedUpBy = req.body?.signedUpBy;

  if (!email) throw new ValidationError("Email field is required!");
  if (!SignedUpBy) throw new ValidationError("SignedUpBy field is required!");
  if (!Object.values(SignedUpBy).includes(signedUpBy))
    throw new ValidationError("Value of SignedUpBy fiedl is incorrect!");

  await userService.signUp(email, password, firstName, lastName, signedUpBy);

  res.status(201).json(new ApiResposne(true, "User is created!").toDict());
}

async function signIn(req: Request, res: Response) {
  const email = req.body?.email;
  const password = req.body?.password;
  const signedUpBy = req.body?.signedUpBy;

  if (!email) throw new ValidationError("Email field is required!");
  if (!SignedUpBy) throw new ValidationError("SignedUpBy field is required!");
  if (!Object.values(SignedUpBy).includes(signedUpBy))
    throw new ValidationError("Value of SignedUpBy fiedl is incorrect!");
  if (!password && signedUpBy == SignedUpBy.SELF)
    throw new ValidationError("Password field is required!");

  const userId = await userService.signIn(email, password, signedUpBy);

  const token = jwt.sign({ userId }, appConfig.JWT_PRIVATE_KEY, {
    expiresIn: "2d",
  });

  return res
    .cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    })
    .status(200)
    .json(new ApiResposne(true, "You are signed in successfully!").toDict());
}

async function signOut(req: Request, res: Response) {
  return res
    .cookie("token", "", {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 0,
    })
    .status(200)
    .json(new ApiResposne(true, "You are signed out!").toDict());
}

async function validateSession(req: Request, res: Response) {
  return res
    .status(200)
    .json(new ApiResposne(true, "token is Validated!").toDict());
}

export default {
  signUp,
  signIn,
  signOut,
  validateSession,
};
