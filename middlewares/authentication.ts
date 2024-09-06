import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AuthorizationError } from "../lib/exceptions";
import appConfig from "../config/common";

async function jwtTokenRequiredWithUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;
  if (!token) throw new AuthorizationError();

  try {
    const decoded = jwt.verify(token, appConfig.JWT_PRIVATE_KEY) as JwtPayload;

    req.body.user = decoded.userId;
  } catch (error) {
    throw new AuthorizationError();
  }

  return next();
}

async function jwtTokenRequiredWithOID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;
  if (!token) throw new AuthorizationError();

  try {
    const decoded = jwt.verify(token, appConfig.JWT_PRIVATE_KEY) as JwtPayload;

    if (decoded?.OID !== appConfig.BUILD_SERVER_OID)
      throw new AuthorizationError();
  } catch (error) {
    throw new AuthorizationError();
  }

  return next();
}

export { jwtTokenRequiredWithUserId, jwtTokenRequiredWithOID };
