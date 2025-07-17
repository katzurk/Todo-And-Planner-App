import axios from "axios";
import { LoginFormData } from "../pages/LoginPage/LoginForm";
import { RegisterFormData } from "../pages/RegisterPage/RegisterForm";
import { IUser } from "../context/AuthContext";

async function logInUser(user: LoginFormData) {
  return axios.post("/api/auth/login", user, { withCredentials: true });
}

async function registerUser(user: RegisterFormData) {
  return axios.post("/api/auth/register", user, { withCredentials: true });
}

async function logOutUser() {
  return axios.delete("/api/auth/logout", { withCredentials: true });
}

async function getUser(): Promise<IUser | null> {
  try {
    const res = await axios.get("/api/auth/verify", { withCredentials: true });
    return res.data as IUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const UserService = {
  logInUser,
  registerUser,
  logOutUser,
  getUser,
};
