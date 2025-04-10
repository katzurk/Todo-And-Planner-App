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

router.put("/:list_id/submit", async (req, res) => {
  const newTasks = req.body.newTasks;
  const list_id = req.params.list_id;

  if (!Array.isArray(newTasks)) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  try {
    const resultDel = await db.query("DELETE FROM TASKS WHERE list_id = $1;", [
      list_id,
    ]);
    for (const task of newTasks) {
      const resultIns = await db.query(
        "INSERT INTO TASKS (list_id, task_id, text, position_order) VALUES ($1, $2, $3, $4);",
        [list_id, task.task_id, task.text, task.position_order]
      );
    }
    res.json({ message: "Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
