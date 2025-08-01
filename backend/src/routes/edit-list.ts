import express, { Request, Response } from "express";
import db from "../db";
const router = express.Router();

router.get("/:list_id", async (req: Request, res: Response): Promise<any> => {
  const list_id = req.params.list_id;
  const query =
    "SELECT LISTS.*, JSON_AGG(TASKS.* ORDER BY TASKS.position_order ASC) as tasks FROM LISTS LEFT JOIN TASKS ON LISTS.list_id = TASKS.list_id WHERE LISTS.list_id = $1 GROUP BY LISTS.list_id;";
  try {
    const result = await db.query(query, [list_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "List not found" });
    }

    if (
      Array.isArray(result.rows[0].tasks) &&
      result.rows[0].tasks.length === 1 &&
      result.rows[0].tasks[0] === null
    ) {
      result.rows[0].tasks = [];
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.put(
  "/:list_id/submit",
  async (req: Request, res: Response): Promise<any> => {
    const newTasks = req.body.newTasks;
    const title = req.body.title;
    const list_id = req.params.list_id;

    if (!Array.isArray(newTasks)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    try {
      const resultUpd = await db.query(
        "UPDATE LISTS SET title = $1 WHERE list_id = $2;",
        [title, list_id]
      );

      if (resultUpd.rowCount === 0) {
        return res.status(404).json({ message: "List not found" });
      }

      const resultDel = await db.query(
        "DELETE FROM TASKS WHERE list_id = $1;",
        [list_id]
      );

      for (const task of newTasks) {
        await db.query(
          "INSERT INTO TASKS (list_id, text, position_order) VALUES ($1, $2, $3);",
          [list_id, task.text, task.position_order]
        );
      }

      res.json({ message: "Updated" });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
