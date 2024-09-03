import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/exceptions";
import errorCodes from "../constants/error_codes";

function errorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError)
    return res.status(error.statusCode).json({
      success: false,
      errorCode: error.errorCode,
      message: error.message,
      data: null,
    });

  return res.status(500).json({
    success: false,
    errorCode: errorCodes.UNKNOWN_ERROR,
    message: error?.message,
    data: null,
  });
}

export default errorHandlerMiddleware;
