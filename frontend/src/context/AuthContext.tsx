import { ReactNode, createContext, useState } from "react";

interface Props {
  children?: ReactNode;
}

export interface IUser {
  email: string;
  username: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  currentUser: IUser | null;
  setCurrentUser: (newState: IUser | null) => void;
}

const initialValue = {
  isAuthenticated: false,
  setAuthenticated: () => {},
  currentUser: null,
  setCurrentUser: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setAuthenticated] = useState(
    initialValue.isAuthenticated
  );
  const [currentUser, setCurrentUser] = useState<IUser | null>(
    initialValue.currentUser
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
