import axios from "axios";
import { LoginFormData } from "../pages/LoginPage/LoginForm";
import { RegisterFormData } from "../pages/RegisterPage/RegisterForm";

async function logInUser(user: LoginFormData) {
  return axios.post(`/api/auth/login`, user, { withCredentials: true });
}

async function registerUser(user: RegisterFormData) {
  return axios.post(`/api/auth/register`, user, { withCredentials: true });
}

async function logOutUser() {
  return axios.delete(`/api/auth/logout`, { withCredentials: true });
}

export const UserService = {
  logInUser,
  registerUser,
  logOutUser,
};
