import request from "supertest";
import app from "../app";
import db from "../config/db";
import mockData from "./mocks/list.mock";
import { auth } from "../middleware/authentication";

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));
jest.mock("../middleware/authentication", () => ({
  auth: jest.fn(),
}));

const mockedQuery = db.query as jest.Mock;
const mockedAuth = auth as jest.Mock;

describe("GET /api/my-lists", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns no lists", async () => {
    mockedQuery.mockResolvedValue({
      rows: [],
    });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it("returns one list with no tasks", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.oneListNoTasks,
    });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].tasks).toHaveLength(0);
  });

  it("returns multiple lists, no tasks", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.multipleListsNoTasks,
    });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].tasks).toHaveLength(0);
    expect(res.body[1].tasks).toHaveLength(0);
  });

  it("returns one list, one task", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.oneListWithOneTask,
    });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].tasks).toHaveLength(1);
  });

  it("returns one list, multiple tasks", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.oneListWithMultipleTasks,
    });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].tasks).toHaveLength(2);
  });

  it("returns error 500 if the database fails", async () => {
    mockedQuery.mockRejectedValue(new Error("Database error"));
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).get("/api/my-lists");

    expect(res.statusCode).toBe(500);
    expect(res.text).toMatch(/Internal Server Error/);
  });
});

describe("PUT /api/my-lists?task_id=ID", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("toggles is done for a task", async () => {
    mockedQuery
      .mockResolvedValueOnce({ rowCount: 1, rows: [] })
      .mockResolvedValueOnce({ rowCount: 1, rows: [] });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).put("/api/my-lists").query({ task_id: 1 });

    expect(mockedQuery).toHaveBeenCalledWith(
      "UPDATE TASKS SET is_done = NOT is_done WHERE task_id = $1",
      ["1"]
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns error 404 if task not found", async () => {
    mockedQuery
      .mockResolvedValueOnce({ rowCount: 1, rows: [] })
      .mockResolvedValueOnce({ rowCount: 0, rows: [] });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).put("/api/my-lists").query({ task_id: 111 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual("Task not found");
  });
});

describe("POST /api/my-lists/delete?task_id=ID", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deletes a list by id", async () => {
    mockedQuery.mockResolvedValue({ rowCount: 1, rows: [] });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app)
      .post("/api/my-lists/delete")
      .query({ list_id: 1 });

    expect(mockedQuery).toHaveBeenCalledWith(
      "DELETE FROM LISTS WHERE list_id = $1",
      ["1"]
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toEqual("Deleted");
  });

  it("returns error 404 if list not found", async () => {
    mockedQuery
      .mockResolvedValueOnce({ rowCount: 1 })
      .mockResolvedValueOnce({ rowCount: 0 });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app)
      .post("/api/my-lists/delete")
      .query({ list_id: 111 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual("List not found");
  });
});

describe("POST /api/my-lists/add?title=TITLE", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("adds a new list with given title", async () => {
    mockedQuery.mockResolvedValue({});
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app)
      .post("/api/my-lists/add")
      .query({ title: "TestList" });

    expect(mockedQuery).toHaveBeenCalledWith(
      "INSERT INTO LISTS (user_id, title) VALUES ($1, $2)",
      [1, "TestList"]
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toEqual("Created a new list");
  });
});
