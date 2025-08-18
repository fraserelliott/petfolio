import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PostsProvider } from "./contexts/PostsContext.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { ProfileContext, ProfileProvider } from "./contexts/ProfileContext.jsx";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <AuthProvider>
      <ProfileProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </ProfileProvider>
    </AuthProvider>
  </ToastProvider>
);
