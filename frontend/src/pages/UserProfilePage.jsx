import PostsPreviewFeed from "../components/PostsPreviewFeed";
import { usePosts } from "../contexts/PostsContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { useEffect, useState } from "react";
import api from "../api";
import { UserAvatar } from "../components/UserAvatar";

const UserProfilePage = () => {
  const { posts, getPostsByUser } = usePosts();
  const location = useLocation();
  const { addToastMessage } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const forceNavigate = () => {
    addToastMessage("Invalid user ID", "error");
    navigate("/");
  };

  useEffect(() => {
    if (!id) {
      forceNavigate();
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        forceNavigate(
          err.response?.status === 404
            ? "User not found"
            : "Error fetching user"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    if (!loading && !user) forceNavigate();
  }, [user, loading]);

  if (!posts) return null;
  if (posts && id && user) {
    return (
      <div>
        <div
          className="flex align-center horizontal-spacing my-2 mx-A"
          style={styles.container}
        >
          <UserAvatar width="100" height="100" user={user} />
          <div className="flex flex-column vertical-spacing">
            <span>{user.name}</span>
            <span>Followers: {user.followersCount}</span>
          </div>
        </div>
        <PostsPreviewFeed posts={getPostsByUser(id)} />
      </div>
    );
  }
};

const styles = {
  container: {
    backgroundColor: "var(--bg-secondary)",
    width: "fit-content",
    border: "var(--glass-border)",
    padding: "1em",
    borderRadius: "1em",
    boxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03)",
  }
};

export default UserProfilePage;
