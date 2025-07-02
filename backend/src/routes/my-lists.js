const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT LISTS.*, JSON_AGG(TASKS.* ORDER BY TASKS.position_order ASC) as tasks FROM LISTS LEFT JOIN TASKS ON LISTS.list_id = TASKS.list_id GROUP BY LISTS.list_id ORDER BY LISTS.date_created DESC;"
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

router.put("/", async (req, res) => {
  const task_id = req.query.task_id;
  const query = "UPDATE TASKS SET is_done = NOT is_done WHERE task_id = $1;";
  try {
    const result = await db.query(query, [task_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/delete", async (req, res) => {
  const list_id = req.query.list_id;
  try {
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
});

router.post("/add", async (req, res) => {
  const title = req.query.title;
  try {
    await db.query("INSERT INTO LISTS (title) VALUES ($1)", [title]);
    res.json({ message: "Created a new list" });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
