import { ReactNode, createContext, useState } from "react";

interface Props {
  children?: ReactNode;
}

interface IAuthContext {
  isAuthenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
}

const initialValue = {
  isAuthenticated: false,
  setAuthenticated: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setAuthenticated] = useState(
    initialValue.isAuthenticated
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
