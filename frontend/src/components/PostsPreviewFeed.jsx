import React from "react";
import PostCard from "./PostCard";
import "./PostsPreviewFeed.css";

const PostsPreviewFeed = ({ posts }) => {
  return (
    <div className="Posts-Preview-Feed">
      {posts.map((post) => {
        return (
            <PostCard key={post.id} post={post} />
        );
      })}
    </div>
  );
};

export default PostsPreviewFeed;
