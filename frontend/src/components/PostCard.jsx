import React from 'react';
import './PostCard.css';

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <div className="post-header">
                <img src={post.postedBy?.avatar || ""} alt={post.name} className="avatar" />
                <span className="name">{post.postedBy?.name || ""}</span>
            </div>

        <div className="post-image">
            <img src={post.image} alt="post"/>
        </div>

        <div className="post-footer">
            <span className="likes">{post.likes} likes </span>
        </div>

        </div>
    );
};

export default PostCard
