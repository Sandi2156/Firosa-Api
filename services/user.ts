import userRepository from "../repository/user";
import bcrypt from "../lib/bcrypt";
import { AppError, ValidationError } from "../lib/exceptions";
import { SignedUpBy as SignedUpByType } from "../lib/types";
import { v4 as uuidv4 } from "uuid";
import { SignedUpBy } from "../constants/common";
import errorCodes from "../constants/error_codes";

async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  signedUpBy: SignedUpByType
) {
  if (!password) password = uuidv4();

  const hashedPassword = await bcrypt.getHashedPassword(password);

  await userRepository.signUp(
    email,
    hashedPassword,
    firstName,
    lastName,
    signedUpBy
  );
}

function getSignInMethodErrorMessage(signedUpBy: string): string {
  switch (signedUpBy) {
    case SignedUpBy.SELF:
      return "Please Sign In using Email-Password!";
    case SignedUpBy.GOOGLE:
      return "Please Sign In using Google!";
    default:
      console.log(`SignedUpBy value is not found - ${signedUpBy}`);
      return "";
  }
}

async function signIn(
  email: string,
  password: string,
  signedUpBy: SignedUpByType
) {
  const user = await userRepository.signIn(email);

  if (!user || (user && !user.length))
    throw new ValidationError("User not found!");

  if (user[0].signedupby !== signedUpBy)
    throw new AppError(
      errorCodes.BAD_REQUEST,
      getSignInMethodErrorMessage(user[0].signedupby),
      400
    );

  if (signedUpBy == SignedUpBy.SELF) {
    const isPasswordMatched = await bcrypt.comparePassword(
      password,
      user[0].password
    );

    if (!isPasswordMatched) throw new ValidationError("Password is wrong!");
  }

  return user[0]._id.toString();
}

export default {
  signUp,
  signIn,
};
