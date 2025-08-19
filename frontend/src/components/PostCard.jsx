import "./PostCard.css";
import defaultAvatar from "../assets/defaultAvatar.png";
import { Link, useLocation } from "react-router-dom";

const PostCard = ({ post }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("pID", post.id);
  return (
    <div className="card card-list my-1 card-move">
      <Link to={`/user?id=${post.author?.id}`}>
        <header>
          <img
            src={post.author?.avatar || defaultAvatar}
            alt={post.name}
            className="avatar"
          />
          <span className="username">{post.author?.name || ""}</span>
        </header>
      </Link>

      <div className="card-image">
        <Link to={`${location.pathname}?${searchParams.toString()}`}>
          <img src={post.image} alt="post" />
        </Link>
      </div>

      <div className="post-footer">
        <span className="likes">🦴 {post.likes} treats </span>
      </div>
    </div>
  );
};

export default PostCard;
