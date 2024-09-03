import { Request, Response, NextFunction } from "express";

function tryCatch(controllerFn: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export default tryCatch;
