const express = require("express");
const db = require("./db");
const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW() AS current_time;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

const listsRoute = require("./routes/my-lists");
app.use("/my-lists", listsRoute);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
