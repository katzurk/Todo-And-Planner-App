import { LoginFormData } from "../pages/LoginPage/LoginForm";
import { RegisterFormData } from "../pages/RegisterPage/RegisterForm";

async function logInUser(user: LoginFormData) {
  console.log("Logged in");
}

async function registerUser(user: RegisterFormData) {
  console.log("Registered");
}

export const UserService = {
  logInUser,
  registerUser,
};
