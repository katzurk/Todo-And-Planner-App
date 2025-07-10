import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/db";

import listsRoute from "./routes/my-lists";
import editListRoute from "./routes/edit-list";
import authRoute from "./routes/auth";

const app = express();
const apiRouter = express.Router();

app.get("/", async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT NOW() AS current_time;");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());

apiRouter.use("/my-lists", listsRoute);
apiRouter.use("/edit-list", editListRoute);
apiRouter.use("/auth", authRoute);

app.use("/api", apiRouter);

export default app;
