import { createContext, useState, useContext, useEffect } from "react";
import api from '../api';

export const PostsContext = createContext();

export function PostsProvider({children}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/api/posts")
    .then((res) => res.data)
    .then((data) => setPosts(data))
    .catch((error) => console.error(error));
  }, []);

  const addPost = (post) => {
    api.post("/api/posts", post)
    .then((res) => res.data)
    .then((data) => {
      setPosts(prevPosts => [...prevPosts, data]);
    })
    .catch((error) => console.error(error));
  }

  return (
      <PostsContext.Provider value={{ posts, addPost }}>
        {children}
      </PostsContext.Provider>
    );
}

export const usePosts = () => useContext(PostsContext);