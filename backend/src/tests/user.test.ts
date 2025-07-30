import request from "supertest";
import app from "../app";
import db from "../config/db";
import { auth } from "../middleware/authentication";
import mockData from "./mocks/user.mock";
import bcrypt from "bcryptjs";

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));
jest.mock("../utils/authUtils", () => ({
  authUtils: {
    generatePassword: jest.fn(),
    createToken: jest.fn(() => "mockedToken"),
  },
}));

jest.mock("../middleware/authentication", () => ({
  auth: jest.fn(),
}));

const mockedQuery = db.query as jest.Mock;
const mockedAuth = auth as jest.Mock;

describe("POST /api/auth/register", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("registers the user correctly", async () => {
    mockedQuery
      .mockResolvedValueOnce({ rowCount: 0 })
      .mockResolvedValueOnce({ rows: mockData.registeredUser });

    const res = await request(app)
      .post("/api/auth/register")
      .send(mockData.registerData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Registered successfully");
  });

  it("returns error 401 if user with given email already exists", async () => {
    mockedQuery.mockResolvedValueOnce({ rowCount: 1 });

    const res = await request(app)
      .post("/api/auth/register")
      .send(mockData.registerData);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("User with this email already exists");
  });
});

describe("POST /api/auth/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("logs in a user correctly", async () => {
    jest.spyOn(bcrypt as any, "compare").mockResolvedValue(true);
    mockedQuery.mockResolvedValue({
      rows: mockData.foundUser,
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send(mockData.loginData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Logged in successfully");
  });

  it("return error 401 if email is incorrect", async () => {
    mockedQuery.mockResolvedValue({
      rowCount: 0,
      rows: [],
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send(mockData.loginData);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Email is incorrect");
  });

  it("return error 401 if password is incorrect", async () => {
    jest.spyOn(bcrypt as any, "compare").mockResolvedValue(false);
    mockedQuery.mockResolvedValue({
      rows: mockData.foundUser,
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send(mockData.loginData);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Password is incorrect");
  });
});

describe("GET /api/auth/verify", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns currently logged-in user", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.currentUser,
    });
    mockedAuth.mockImplementation((req, res, next) => {
      req.user = 1;
      next();
    });

    const res = await request(app).get("/api/auth/verify");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData.currentUser[0]);
  });

  it("returns null if no user is logged-in", async () => {
    mockedQuery.mockResolvedValue({
      rows: mockData.currentUser,
    });
    mockedAuth.mockImplementation((req, res, next) => {
      res.status(401).json({ message: "Not Authorized" });
    });

    const res = await request(app).get("/api/auth/verify");
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toEqual("Not Authorized");
  });
});

describe("DELETE /api/auth/logout", () => {});
