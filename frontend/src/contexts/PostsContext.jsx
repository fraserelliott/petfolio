import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { useToast } from "./ToastContext";
import { extractErrorMessage } from "../utils/errorUtils";
import { useAuth } from "./AuthContext";
import { useProfile } from "./ProfileContext";

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const { addToastMessage } = useToast();
  const { following } = useProfile();

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
    return posts.filter((p) => p.author.id === id);
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

  const getPostsFromFollowList = () => {
    return posts.filter((post) => following.includes(post.postedBy));
  };

  const addComment = (comment) => {
    api
      .post("/api/comments", comment)
      .catch((error) => addToastMessage(extractErrorMessage(error), "error"));
  };

  const editComment = (comment) => {
    api
      .put(`/api/comments/${comment.id}`, comment)
      .catch((error) => addToastMessage(extractErrorMessage(error), "error"));
  }

  const deleteComment = (id) => {
    api
      .delete(`/api/comments/${id}`)
      .catch((error) => addToastMessage(extractErrorMessage(error), "error"));
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        getPostsByUser,
        getCommentsForPostAsync,
        getPostsFromFollowList,
        addComment,
        editComment,
        deleteComment
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);
