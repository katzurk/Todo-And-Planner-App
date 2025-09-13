import express, { Request, Response } from "express";
import db from "../config/db";
import { auth, CustomRequest } from "../middleware/authentication";
const router = express.Router();

router.get(
  "/new-tasks",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    const user = (req as CustomRequest).user;
    try {
      const tasks = await db.query(
        "SELECT TASKS.text FROM TASKS INNER JOIN LISTS ON TASKS.list_id = LISTS.list_id" +
          " WHERE LISTS.user_id = $1 ORDER BY TASKS.date_created DESC LIMIT 5",
        [user]
      );

      res.json(tasks.rows);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get(
  "/new-lists",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    const user = (req as CustomRequest).user;
    try {
      const lists = await db.query(
        "SELECT title FROM LISTS WHERE user_id = $1 ORDER BY date_created DESC LIMIT 3",
        [user]
      );

      res.json(lists.rows);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
