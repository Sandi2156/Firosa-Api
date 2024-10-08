import errorCodes from "../constants/error_codes";

class AppError extends Error {
  public errorCode: string;
  public statusCode: number;

  constructor(errorCode: string, message: string, statusCode: number) {
    super(message);

    this.errorCode = errorCode;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(errorCodes.VALIDATION_ERROR, message, 400);
  }
}

class AuthorizationError extends AppError {
  constructor() {
    super(
      errorCodes.UNAUTHORIZED,
      "You are not authorized to access this resource. Please sign in!",
      401
    );
  }
}

class BuildServerAuthorizationError extends AppError {
  constructor() {
    super(errorCodes.UNAUTHORIZED, "Build Server can't be Authorized!", 401);
  }
}

class ECSError extends AppError {
  constructor(message?: string) {
    super(
      errorCodes.UNKNOWN_ERROR,
      message || "ECS Server Error. Please check again after some time!",
      500
    );
  }
}

export {
  AppError,
  ValidationError,
  AuthorizationError,
  ECSError,
  BuildServerAuthorizationError,
};
