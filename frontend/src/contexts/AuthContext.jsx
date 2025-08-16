import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { useToast } from "./ToastContext";
import { extractErrorMessage } from "../utils/errorUtils";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("authToken"));
  const [id, setId] = useState(() =>
    sessionStorage.getItem("id")
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
    if (id) {
      sessionStorage.setItem("id", id);
    } else {
      sessionStorage.removeItem("id");
    }
  }, [id]);

  const login = (email, password) => {
    api
      .post("/api/users/login", { email, password })
      .then((res) => res.data)
      .then((data) => {
        setToken(data.token);
        setId(data.id);
      })
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
  };

  const logout = () => {
    setToken(null);
    setId(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, id, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
