import React, { createContext, useContext } from "react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext({
  isAuthenticated: false,
  login: (access: string, refresh: string) => {},
  logout: () => {},
});

export function AuthContextProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );

  const login = (access: string, refresh: string) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
