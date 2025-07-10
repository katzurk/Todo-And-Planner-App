import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

export interface CustomRequest extends Request {
  user: number | JwtPayload;
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const jwtToken = req.cookies["auth"];
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, SECRET_KEY) as JwtPayload;
    (req as CustomRequest).user = payload.user;
    next();
  } catch (err) {
    res.status(403).json("Not Authorized");
  }
};
