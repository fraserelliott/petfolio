import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { useToast } from "./ToastContext";
import { extractErrorMessage } from "../utils/errorUtils";
import { useAuth } from "./AuthContext";

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const { addToastMessage } = useToast();
  const { id } = useAuth();

  useEffect(() => {
    api
      .get("/api/posts")
      .then((res) => res.data)
      .then((data) => setPosts(data))
      .catch((error) => addToastMessage(extractErrorMessage(error), "error"));
  }, []);

  const addPost = (post) => {
    api
      .post("/api/posts", post)
      .then((res) => res.data)
      .then((data) => {
        setPosts((prevPosts) => [...prevPosts, data]);
      })
      .then(() => addToastMessage("Post Added", "success"))
      .catch((error) => addToastMessage(extractErrorMessage(error), "error"));
  };

  const getPostsByUser = (id) => {
    return posts.filter((p) => p.id === id);
  };

  /**
   * Fetch comments for a given post.
   * @param {string} id - Post ID
   * @returns {Promise<Array>} Resolves to an array of comment objects.
   */
  const getCommentsForPostAsync = async (id) => {
    try {
      const res = await api.get(`/api/comments?postsId=${id}`);
      return res.data;
    } catch (error) {
      addToastMessage(extractErrorMessage(error), "error");
      return [];
    }
  };



  return (
    <PostsContext.Provider
      value={{ posts, addPost, getPostsByUser, getCommentsForPostAsync }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);
