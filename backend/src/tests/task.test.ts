import request from "supertest";
import app from "../app";
import db from "../config/db";
import mockData from "./mocks/list.mock";

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

const mockedQuery = db.query as jest.Mock;

describe("GET /api/edit-list/LIST_ID", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns a list with no tasks", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.oneListNoTasks,
    });

    const res = await request(app).get("/api/edit-list/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.tasks).toHaveLength(0);
  });

  it("returns a list, with tasks", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.oneListWithMultipleTasks,
    });

    const res = await request(app).get("/api/edit-list/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.tasks).toHaveLength(2);
  });

  it("returns error 500 if the database fails", async () => {
    mockedQuery.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/api/edit-list/1");

    expect(res.statusCode).toBe(500);
    expect(res.text).toMatch(/Internal Server Error/);
  });

  it("returns error 404 if list is not found", async () => {
    mockedQuery.mockResolvedValue({ rowCount: 0, rows: [] });

    const res = await request(app).get("/api/edit-list/1");

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "List not found" });
  });
});

describe("PUT /api/edit-list/LIST_ID/submit", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("modifies an existing list", async () => {
    const listId = "1";
    const newTasks = [
      { task_id: 1, text: "task1", position_order: 1 },
      { task_id: 2, text: "task2", position_order: 2 },
    ];
    const title = "NewList";

    mockedQuery
      .mockResolvedValueOnce({ rowCount: 1 })
      .mockResolvedValueOnce({ rowCount: 2 })
      .mockResolvedValueOnce({ rowCount: 1 })
      .mockResolvedValueOnce({ rowCount: 1 });

    const res = await request(app)
      .put("/api/edit-list/1/submit")
      .send({ newTasks, title });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toEqual("Updated");
    expect(mockedQuery).toHaveBeenCalledTimes(4);

    expect(mockedQuery).toHaveBeenNthCalledWith(
      1,
      "UPDATE LISTS SET title = $1 WHERE list_id = $2;",
      [title, listId]
    );
    expect(mockedQuery).toHaveBeenNthCalledWith(
      2,
      "DELETE FROM TASKS WHERE list_id = $1;",
      [listId]
    );
    newTasks.forEach((task) =>
      expect(mockedQuery).toHaveBeenNthCalledWith(
        newTasks.indexOf(task) + 3,
        "INSERT INTO TASKS (list_id, text, position_order) VALUES ($1, $2, $3);",
        [listId, task.text, task.position_order]
      )
    );
  });

  it("returns error 404 if list is not found", async () => {
    mockedQuery.mockResolvedValueOnce({ rowCount: 0 });

    const res = await request(app)
      .put("/api/edit-list/111/submit")
      .send({ newTasks: [], title: "Test" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual("List not found");
  });

  it("returns error 500 if the database fails", async () => {
    mockedQuery.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .put("/api/edit-list/1/submit")
      .send({ newTasks: [], title: "Test" });

    expect(res.statusCode).toBe(500);
    expect(res.text).toMatch(/Internal Server Error/);
  });

  it("returns error 400 if tasks are not an array", async () => {
    mockedQuery.mockResolvedValueOnce({ rowCount: 1 });

    const res = await request(app)
      .put("/api/edit-list/111/submit")
      .send({ newTasks: 8, title: "Test" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual("Invalid data format");
  });
});
