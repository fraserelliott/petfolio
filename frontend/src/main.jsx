import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PostsProvider } from "./contexts/PostsContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PostsProvider>
      <App />
    </PostsProvider>
  </AuthProvider>
);
