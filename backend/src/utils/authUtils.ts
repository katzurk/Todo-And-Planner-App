import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/authentication";

async function generatePassword(password: string) {
  const saltRound = 9;
  const salt = await bcrypt.genSalt(saltRound);

  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

function createToken(user_id: number) {
  const payload = { user: user_id };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1hr" });
}

export const authUtils = {
  generatePassword,
  createToken,
};
