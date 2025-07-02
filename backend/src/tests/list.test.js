const request = require("supertest");
const app = require("../app");
const db = require("../db");
const mockData = require("./mocks/list.mock");

jest.mock("../db", () => ({
  query: jest.fn(),
}));

describe("GET /api/my-lists", () => {
  it("returns no lists", async () => {
    db.query.mockResolvedValue({
      rows: [],
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it("returns one list with no tasks", async () => {
    db.query.mockResolvedValue({
      rows: mockData.oneListNoTasks,
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].tasks).toHaveLength(0);
  });

  it("returns multiple lists, no tasks", async () => {
    db.query.mockResolvedValue({
      rows: mockData.multipleListsNoTasks,
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].tasks).toHaveLength(0);
    expect(res.body[1].tasks).toHaveLength(0);
  });

  it("returns one list, one task", async () => {
    db.query.mockResolvedValue({
      rows: mockData.oneListWithOneTask,
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].tasks).toHaveLength(1);
  });

  it("returns one list, multiple tasks", async () => {
    db.query.mockResolvedValue({
      rows: mockData.oneListWithMultipleTasks,
    });

    const res = await request(app).get("/api/my-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].tasks).toHaveLength(2);
  });

  it("returns error 500 if the database fails", async () => {
    db.query.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/api/my-lists");

    expect(res.statusCode).toBe(500);
    expect(res.text).toMatch(/Internal Server Error/);
  });
});

describe("PUT /api/my-lists?task_id=ID", () => {
  it("toggles is done for a task", async () => {
    db.query.mockResolvedValue({ rowCount: 1, rows: [] });

    const res = await request(app).put("/api/my-lists?task_id=1");

    expect(db.query).toHaveBeenCalledWith(
      "UPDATE TASKS SET is_done = NOT is_done WHERE task_id = $1;",
      ["1"]
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns error 404 if task not found", async () => {
    db.query.mockResolvedValue({ rowCount: 0, rows: [] });

    const res = await request(app).put("/api/my-lists?task_id=111");

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "Task not found" });
  });
});

describe("POST /api/my-lists/delete?task_id=ID", () => {
  it("deletes a list by id", async () => {
    db.query.mockResolvedValue({ rowCount: 1, rows: [] });

    const res = await request(app).post("/api/my-lists/delete?list_id=1");

    expect(db.query).toHaveBeenCalledWith(
      "DELETE FROM LISTS WHERE list_id = $1;",
      ["1"]
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });

  it("returns error 404 if list not found", async () => {
    db.query.mockResolvedValue({ rowCount: 0, rows: [] });

    const res = await request(app).post("/api/my-lists/delete?list_id=111");

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "List not found" });
  });
});

describe("POST /api/my-lists/add?title=TITLE", () => {
  it("adds a new list with given title", async () => {
    db.query.mockResolvedValue({});

    const res = await request(app).post("/api/my-lists/add?title=TestList");

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO LISTS (title) VALUES ($1)",
      ["TestList"]
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Created a new list" });
  });
});
