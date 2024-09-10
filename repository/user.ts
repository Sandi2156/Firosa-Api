import mongodb from "../integrations/mongodb";
import UserModel from "../models/user";
import { AppError } from "../lib/exceptions";
import errorCodes from "../constants/error_codes";
import { SignedUpBy } from "../lib/types";

async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  signedUpBy: SignedUpBy
) {
  await mongodb.connect();

  try {
    await UserModel.create({
      email,
      password,
      firstname: firstName,
      lastname: lastName,
      signedupby: signedUpBy,
    });
  } catch (error: any) {
    if (error.code === 11000)
      throw new AppError(
        errorCodes.DUPLICATE_RECORD,
        "There is already an account with this email!",
        400
      );
    else throw error;
  }
}

async function signIn(email: string) {
  await mongodb.connect();

  return await UserModel.find({
    email,
  });
}

export default {
  signUp,
  signIn,
};
