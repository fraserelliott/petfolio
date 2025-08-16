import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { useToast } from "./ToastContext";
import { extractErrorMessage } from "../utils/errorUtils";
import { useAuth } from "./AuthContext";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const { id, logout } = useAuth();
  const { addToastMessage } = useToast();

  useEffect(() => {
    if (id) {
      api
        .get(`/api/users/${id}`)
        .then((res) => setUser(res.data))
        .catch((error) => {
          addToastMessage(extractErrorMessage(error), "error");
        });
    } else {
      setUser(null);
    }
  }, [id]);

  const updateAccount = (name, email, password, avatar) => {
    api
      .put(`/api/users/${id}`, { name, email, password, avatar })
      .then((res) => setUser(res.data))
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
  };

  const deleteAccount = () => {
    api
      .delete(`/api/users/${id}`)
      .then((res) => logout())
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
  };

  return (
    <ProfileContext.Provider value={{ user, updateAccount, deleteAccount }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
