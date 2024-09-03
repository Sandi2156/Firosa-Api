import userRepository from "../repository/user";
import sessionService from "./session";
import bcrypt from "../lib/bcrypt";
import { ValidationError } from "../lib/exceptions";

async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const hashedPassword = await bcrypt.getHashedPassword(password);

  await userRepository.signUp(email, hashedPassword, firstName, lastName);
}

async function signIn(email: string, password: string) {
  const user = await userRepository.signIn(email);

  if (!user || (user && !user.length))
    throw new ValidationError("User not found!");

  const isPasswordMatched = await bcrypt.comparePassword(
    password,
    user[0].password
  );

  if (!isPasswordMatched) throw new ValidationError("Password is wrong!");

  const sessionId = await sessionService.createSession(user[0]._id);

  return sessionId;
}

async function signOut(sessionId: string) {
  await sessionService.removeSession(sessionId);
}

export default {
  signUp,
  signIn,
  signOut,
};
