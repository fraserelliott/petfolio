import React from 'react';
import PostCard from './PostCard';
import './PostsPreviewFeed.css';

const PostsPreviewFeed = ({ posts }) => {
    return (
        <div className="card-preview-feed">
            {posts.map (post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostsPreviewFeed;
