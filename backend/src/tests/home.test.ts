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

describe("GET /api/home/new-tasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns up to 5 recently added tasks", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.newTasks,
    });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).get("/api/home/new-tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(5);
  });
});

describe("GET /api/home/new-lists", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns up to 3 recently added lists", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.newLists,
    });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).get("/api/home/new-lists");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(3);
  });
});
