import React from 'react';
import { Link } from "react-router-dom";
import './PostCard.css';
import defaultAvatar from "../assets/defaultAvatar.png";

const PostCard = ({ post }) => {
    return (
        <div className="card card-list my-1 card-move">
            <header>
                <img src={post.author?.avatar || defaultAvatar} alt={post.name} className="avatar" />
                <span className="username">{post.author?.name || ""}</span>
            </header>

            <div className="card-image">
                <Link key={post.id} to={`?pID=${post.id}`}>
                    <img src={post.image} alt="post"/>
                </Link>
            </div>

            <footer>
                <span className="likes">🦴 {post.likes} treats </span>
            </footer>

        </div>
    );
};

export default PostCard
