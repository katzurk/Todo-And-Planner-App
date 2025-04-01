const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT LISTS.*, JSON_AGG(TASKS.*) FROM LISTS INNER JOIN TASKS ON LISTS.list_id = TASKS.list_id GROUP BY LISTS.list_id;"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
