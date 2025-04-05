const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/:list_id", async (req, res) => {
  const list_id = req.params.list_id;
  const query =
    "SELECT LISTS.*, JSON_AGG(TASKS.* ORDER BY TASKS.position_order ASC) as tasks FROM LISTS INNER JOIN TASKS ON LISTS.list_id = TASKS.list_id WHERE LISTS.list_id = $1 GROUP BY LISTS.list_id;";
  try {
    const result = await db.query(query, [list_id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:list_id", async (req, res) => {
  const { task_id, direction } = req.query;
  const list_id = req.params.list_id;

  if (!["up", "down"].includes(direction)) {
    return res.status(400).json({ message: "Invalid direction" });
  }

  try {
    const result = await db.query(
      "SELECT position_order FROM TASKS WHERE task_id = $1;",
      [task_id]
    );
    const task = result.rows[0];

    const currentPos = task.position_order;
    const newPos = direction === "up" ? currentPos - 1 : currentPos + 1;

    const taskResult = await db.query(
      "SELECT task_id FROM TASKS WHERE position_order = $1 AND list_id = $2;",
      [newPos, list_id]
    );

    if (taskResult.rowCount === 0) {
      return res.status(400).json({ message: "Can't move that direction" });
    }

    const taskAboveId = taskResult.rows[0].task_id;
    await db.query("UPDATE TASKS SET position_order = $1 WHERE task_id = $2;", [
      currentPos,
      taskAboveId,
    ]);
    await db.query("UPDATE TASKS SET position_order = $1 WHERE task_id = $2;", [
      newPos,
      task_id,
    ]);
    res.json({ message: "Changed positions" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
