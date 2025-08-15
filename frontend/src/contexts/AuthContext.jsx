import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { useToast } from "./ToastContext";
import { extractErrorMessage } from "../utils/errorUtils";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("authToken"));
  const [username, setUsername] = useState(() =>
    sessionStorage.getItem("username")
  );
  const { addToastMessage } = useToast();

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("authToken", token);
    } else {
      sessionStorage.removeItem("authToken");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("username", username);
    } else {
      sessionStorage.removeItem("username");
    }
  }, [username]);

  const login = (username, password) => {
    api
      .post("/api/users/login", { username, password })
      .then((res) => res.data)
      .then((data) => {
        setToken(data.token);
        setUsername(username);
        //addToastMessage("Logged In Successfully", "success");
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
