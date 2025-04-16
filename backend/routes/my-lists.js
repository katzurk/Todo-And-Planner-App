const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT LISTS.*, JSON_AGG(TASKS.* ORDER BY TASKS.position_order ASC) as tasks FROM LISTS INNER JOIN TASKS ON LISTS.list_id = TASKS.list_id GROUP BY LISTS.list_id;"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/", async (req, res) => {
  const task_id = req.query.task_id;
  const query = "UPDATE TASKS SET is_done = NOT is_done WHERE task_id = $1;";
  try {
    const result = await db.query(query, [task_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/delete", async (req, res) => {
  const list_id = req.query.list_id;
  try {
    await db.query("DELETE FROM LISTS WHERE list_id = $1;", [list_id]);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
