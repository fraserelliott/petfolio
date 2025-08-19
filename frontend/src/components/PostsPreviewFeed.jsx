import React from 'react';
import PostCard from './PostCard';
import { Link } from "react-router-dom";
import './PostsPreviewFeed.css';

const PostsPreviewFeed = ({ posts }) => {
    return (
        <div className="Posts-Preview-Feed">
            {posts.map (post => (
                <Link key={post.id} to={`?pID=${post.id}`}>
                    <PostCard key={post.id} post={post} />
                </Link>
            ))}
        </div>
    );
};

export default PostsPreviewFeed;