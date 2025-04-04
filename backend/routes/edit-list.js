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

module.exports = router;
