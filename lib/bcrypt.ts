import bcrypt from "bcrypt";

const saltRounds = 10;

async function getHashedPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export default {
  getHashedPassword,
  comparePassword,
};
