import express, { Request, Response } from "express";
import db from "../config/db";
import bcrypt from "bcryptjs";
import { authUtils } from "../utils/authUtils";
import { auth, CustomRequest } from "../middleware/authentication";
const router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const user = req.body;
  try {
    const findUser = await db.query("SELECT * FROM USERS WHERE email = $1;", [
      user.email,
    ]);
    if (findUser.rowCount !== 0) {
      return res
        .status(401)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await authUtils.generatePassword(user.password);
    const newUser = await db.query(
      "INSERT INTO USERS (email, username, password_hash) VALUES ($1, $2, $3) RETURNING user_id;",
      [user.email, user.username, hashedPassword]
    );

    const token = authUtils.createToken(newUser.rows[0].user_id);
    res.cookie("auth", token, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: "Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const user = req.body;
  try {
    const findUser = await db.query("SELECT * FROM USERS WHERE email = $1;", [
      user.email,
    ]);
    if (findUser.rowCount === 0) {
      return res.status(401).json({ message: "Email is incorrect" });
    }

    const isValidPass = await bcrypt.compare(
      user.password,
      findUser.rows[0].password_hash
    );
    if (!isValidPass) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = authUtils.createToken(findUser.rows[0].user_id);
    res.cookie("auth", token, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/verify",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const user = (req as CustomRequest).user;
      const result = await db.query(
        "SELECT email, username FROM USERS WHERE user_id = $1 ",
        [user]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.delete("/logout", async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("auth", { httpOnly: true, sameSite: "lax" });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
