import express, { Request, Response } from "express";
import db from "../config/db";
import bcrypt from "bcryptjs";
import { authUtils } from "../utils/authUtils";
import { auth } from "../middleware/authorization";
const router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const user = req.body;
  try {
    const findUser = await db.query(
      "SELECT * FROM USERS WHERE username = $1;",
      [user.username]
    );
    if (findUser.rowCount !== 0) {
      return res.status(401).json("User with this email already exists");
    }

    const hashedPassword = await authUtils.generatePassword(user.password);
    const newUser = await db.query(
      "INSERT INTO USERS (email, username, password_hash) VALUES ($1, $2, $3);",
      [user.email, user.username, hashedPassword]
    );

    const token = authUtils.createToken(newUser.rows[0].user_id);
    res.json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const user = req.body;
  try {
    const findUser = await db.query(
      "SELECT * FROM USERS WHERE username = $1;",
      [user.username]
    );
    if (findUser.rowCount === 0) {
      return res.status(401).json("Email is incorrect");
    }

    const isValidPass = await bcrypt.compare(
      user.password,
      findUser.rows[0].password_hash
    );
    if (!isValidPass) {
      return res.status(401).json("Password is incorrect");
    }

    const token = authUtils.createToken(findUser.rows[0].user_id);
    res.json({ token: token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/verify",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      res.json(true);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
