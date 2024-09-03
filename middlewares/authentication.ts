import { Request, Response, NextFunction } from "express";

import sessionService from "../services/session";
import { AuthorizationError } from "../lib/exceptions";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies?.sessionId;

  if (!sessionId) throw new AuthorizationError();

  const sessionEntry = await sessionService.findUserForASessionId(sessionId);
  if (!sessionEntry || !sessionEntry.length) throw new AuthorizationError();

  req.body.user = sessionEntry[0].userId;

  return next();
}

export default authMiddleware;
