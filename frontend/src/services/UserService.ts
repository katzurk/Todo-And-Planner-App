import axios from "axios";
import { LoginFormData } from "../pages/LoginPage/LoginForm";
import { RegisterFormData } from "../pages/RegisterPage/RegisterForm";
import { IUser } from "../context/AuthContext";

async function logInUser(user: LoginFormData) {
  try {
    return await axios.post("/api/auth/login", user, { withCredentials: true });
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

async function registerUser(user: RegisterFormData) {
  try {
    return await axios.post("/api/auth/register", user, {
      withCredentials: true,
    });
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

async function logOutUser() {
  try {
    return await axios.delete("/api/auth/logout", { withCredentials: true });
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

async function getUser(): Promise<IUser | null> {
  try {
    const res = await axios.get("/api/auth/verify", { withCredentials: true });
    return res.data as IUser;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    throw new Error(message);
  }
}

export const UserService = {
  logInUser,
  registerUser,
  logOutUser,
  getUser,
};
