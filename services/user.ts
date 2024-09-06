import userRepository from "../repository/user";
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

  return user[0]._id.toString();
}

export default {
  signUp,
  signIn,
};
