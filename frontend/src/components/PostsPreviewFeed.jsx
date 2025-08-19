import React from "react";
import PostCard from "./PostCard";
import { Link, useLocation } from "react-router-dom";
import "./PostsPreviewFeed.css";

const PostsPreviewFeed = ({ posts }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <div className="Posts-Preview-Feed">
      {posts.map((post) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("pID", post.id);

        return (
          <Link
            key={post.id}
            to={`${location.pathname}?${searchParams.toString()}`}
          >
            <PostCard key={post.id} post={post} />
          </Link>
        );
      })}
    </div>
  );
};

export default PostsPreviewFeed;
