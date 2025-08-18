import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { useToast } from "./ToastContext";
import { extractErrorMessage } from "../utils/errorUtils";
import { useAuth } from "./AuthContext";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const { id, logout } = useAuth();
  const { addToastMessage } = useToast();

  useEffect(() => {
    if (id) {
      api
        .get(`/api/users`)
        .then((res) => setUser(res.data))
        .catch((error) => {
          addToastMessage(extractErrorMessage(error), "error");
        });
      api
        .get(`/api/users/following`)
        .then((res) => setFollowing(res.data))
        .catch((error) => {
          addToastMessage(extractErrorMessage(error), "error");
        });
    } else {
      setUser(null);
      setFollowing([]);
    }
  }, [id]);

  const updateAccount = (name, email, password, avatar) => {
    api
      .put(`/api/users`, { name, email, password, avatar })
      .then((res) => setUser(res.data))
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
  };

  const deleteAccount = () => {
    api
      .delete(`/api/users`)
      .then((res) => logout())
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
  };

  const followAccount = (followingId) => {
    api
      .post(`/following/${followingId}`)
      .then((res) => setFollowing((prev) => [...prev, followingId]))
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
  };

  const unfollowAccount = (followingId) => {
    api
      .delete(`/following/${followingId}`)
      .then((res) => setFollowing((prev) => prev.filter(fId => fId !== followingId)))
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
  }

  return (
    <ProfileContext.Provider
      value={{ user, following, updateAccount, deleteAccount, followAccount, unfollowAccount }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
