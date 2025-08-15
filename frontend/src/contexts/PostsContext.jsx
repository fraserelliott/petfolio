import { createContext, useState, useContext, useEffect } from "react";
import api from '../api';
import { useToast } from './ToastContext';
import { extractErrorMessage } from "../utils/errorUtils";

export const PostsContext = createContext();

export function PostsProvider({children}) {
  const [posts, setPosts] = useState([]);
  const { addToastMessage } = useToast();
  
  useEffect(() => {
    api.get("/api/posts")
    .then((res) => res.data)
    .then((data) => setPosts(data))
    .catch((error) => addToastMessage(extractErrorMessage(error), 'error'));
  }, []);

  const addPost = (post) => {
    api.post("/api/posts", post)
    .then((res) => res.data)
    .then((data) => {
      setPosts(prevPosts => [...prevPosts, data]);
    })
    .then(addToastMessage("Post Added", "success"))
    .catch((error) => addToastMessage(extractErrorMessage(error), 'error'));
  }

  return (
      <PostsContext.Provider value={{ posts, addPost }}>
        {children}
      </PostsContext.Provider>
    );
}

export const usePosts = () => useContext(PostsContext);