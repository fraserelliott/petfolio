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
    const payload = {};
    if (name !== undefined) payload.name = name;
    if (email !== undefined) payload.email = email;
    if (password !== undefined) payload.password = password;
    if (avatar !== undefined) payload.avatar = avatar;

    api
      .put(`/api/users`, payload)
      .then((res) => setUser(res.data))
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
    addToastMessage("Updated details", "success")
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
      .post(`/api/users/following/${followingId}`)
      .then((res) => setFollowing((prev) => [...prev, followingId]))
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
  };

  const unfollowAccount = (followingId) => {
    api
      .delete(`/api/users/following/${followingId}`)
      .then((res) =>
        setFollowing((prev) => prev.filter((fId) => fId !== followingId))
      )
      .catch((error) => {
        addToastMessage(extractErrorMessage(error), "error");
      });
  };

  const isFollowing = (followingId) => {
    if (!following || following.length === 0) return false;
    return following.includes(followingId);
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        following,
        updateAccount,
        deleteAccount,
        followAccount,
        unfollowAccount,
        isFollowing,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
