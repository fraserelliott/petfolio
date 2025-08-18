import React from 'react';
import './PostCard.css';
import defaultAvatar from "../assets/defaultAvatar.png";

const PostCard = ({ post }) => {
  console.log(post);
    return (
        <div className="post-card">
            <div className="post-header">
                <img src={post.author?.avatar || defaultAvatar} alt={post.name} className="avatar" />
                <span className="name">{post.author?.name || ""}</span>
            </div>

        <div className="post-image">
            <img src={post.image} alt="post"/>
        </div>

        <div className="post-footer">
            <span className="likes">🦴 {post.likes} treats </span>
        </div>

        </div>
    );
};

export default PostCard
