import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { useToast } from "./ToastContext";
import { extractErrorMessage } from "../utils/errorUtils";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username")
  );
  const { addToastMessage } = useToast();

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  const login = (username, password) => {
    api
      .post("/api/users/login", { username, password })
      .then((res) => res.data)
      .then((data) => {
        setToken(data.token);
        setUsername(username);
      })
      .catch((error) => {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";

        addToastMessage(extractErrorMessage(error), "error");
      });
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, username, setUsername, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
