import express, { Request, Response } from "express";
import db from "../config/db";
import { auth, CustomRequest } from "../middleware/authentication";
const router = express.Router();

router.get("/", auth, async (req: Request, res: Response): Promise<any> => {
  const user = (req as CustomRequest).user;
  try {
    const result = await db.query(
      "SELECT LISTS.*, JSON_AGG(TASKS.* ORDER BY TASKS.position_order ASC) as tasks " +
        "FROM LISTS LEFT JOIN TASKS ON LISTS.list_id = TASKS.list_id WHERE user_id = $1 " +
        "GROUP BY LISTS.list_id ORDER BY LISTS.date_created DESC;",
      [user]
    );
    for (const list of result.rows) {
      if (
        Array.isArray(list.tasks) &&
        list.tasks.length === 1 &&
        list.tasks[0] === null
      ) {
        list.tasks = [];
      }
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/", auth, async (req: Request, res: Response): Promise<any> => {
  const task_id = req.query.task_id;
  const user = (req as CustomRequest).user;
  try {
    const isAuth = await db.query(
      "SELECT task_id FROM TASKS " +
        "INNER JOIN LISTS ON TASKS.list_id = LISTS.list_id " +
        "WHERE user_id = $1 AND task_id = $2",
      [user, task_id]
    );

    if (isAuth.rowCount === 0) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const result = await db.query(
      "UPDATE TASKS SET is_done = NOT is_done WHERE task_id = $1;",
      [task_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/delete",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    const list_id = req.query.list_id;
    const user = (req as CustomRequest).user;
    try {
      const isAuth = await db.query(
        "SELECT list_id FROM LISTS WHERE user_id = $1 AND list_id = $2",
        [user, list_id]
      );

      if (isAuth.rowCount === 0) {
        return res.status(401).json({ message: "Not authorized" });
      }

      const result = await db.query("DELETE FROM LISTS WHERE list_id = $1;", [
        list_id,
      ]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "List not found" });
      }

      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/add", auth, async (req: Request, res: Response): Promise<any> => {
  const title = req.query.title;
  const user = (req as CustomRequest).user;
  try {
    const result = await db.query(
      "INSERT INTO LISTS (user_id, title) VALUES ($1, $2)",
      [user, title]
    );
    res.json({ message: "Created a new list" });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
