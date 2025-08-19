import "./PostCard.css";
import defaultAvatar from "../assets/defaultAvatar.png";
import { Link, useLocation } from "react-router-dom";

const PostCard = ({ post }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("pID", post.id);

  return (
    <div className="post-card">
      <Link to={`/user?id=${post.author?.id}`}>
        <div className="post-header">
          <img
            src={post.author?.avatar || defaultAvatar}
            alt={post.name}
            className="avatar"
          />
          <span className="name">{post.author?.name || ""}</span>
        </div>
      </Link>

      <Link to={`${location.pathname}?${searchParams.toString()}`}>
        <div className="post-image">
          <img src={post.image} alt="post" />
        </div>

        <div className="post-footer">
          <span className="likes">🦴 {post.likes} treats </span>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
