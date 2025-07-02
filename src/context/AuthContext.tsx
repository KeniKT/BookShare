import { createContext, useContext, useState, type ReactNode } from "react";

// Define the context value type
interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: () => void;
  removeAuthenticated: () => void;
}

// Define default value
const defaultValue: AuthContextType = {
  isAuthenticated: false,
  setAuthenticated: () => {},
  removeAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

// Define props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const removeAuthenticated = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, removeAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
