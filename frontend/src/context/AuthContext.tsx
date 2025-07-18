import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, createContext } from "react";
import { UserService } from "../services/UserService";
import { LoginFormData } from "../pages/LoginPage/LoginForm";
import { RegisterFormData } from "../pages/RegisterPage/RegisterForm";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

export interface IUser {
  email: string;
  username: string;
}

interface IAuthContext {
  currentUser: IUser | null;
  isAuthenticated: boolean;
  logIn: (data: LoginFormData) => void;
  signUp: (data: RegisterFormData) => void;
  logOut: () => void;
}

const initialValue = {
  currentUser: null,
  isAuthenticated: false,
  logIn: () => {},
  signUp: () => {},
  logOut: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: UserService.getUser,
    retry: false,
  });

  const logIn = async (data: LoginFormData) => {
    await UserService.logInUser(data);
    await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    navigate("/my-lists");
  };

  const signUp = async (data: RegisterFormData) => {
    await UserService.registerUser(data);
    await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    navigate("/my-lists");
  };

  const logOut = async () => {
    await UserService.logOutUser();
    queryClient.setQueryData(["currentUser"], null);
    navigate("/");
  };

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser ?? null,
        isAuthenticated,
        logIn,
        signUp,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
