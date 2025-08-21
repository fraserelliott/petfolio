import PostsPreviewFeed from "../components/PostsPreviewFeed";
import { usePosts } from "../contexts/PostsContext";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

const FollowingPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { posts, getPostsFromFollowList } = usePosts();
  const { following } = useProfile();

  useEffect(() => {
    if (!token)
      navigate("/");
  }, [ token ]);

  if (!posts || !following)
    return null;

  return (
    <PostsPreviewFeed posts={getPostsFromFollowList()} />
  );
}

export default FollowingPage;