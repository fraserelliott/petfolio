    import React from 'react';
    import PostsPreviewFeed from '../components/PostsPreviewFeed';
    import {usePosts} from '../contexts/PostsContext';    

    const HomePage = () => {
        const {posts} =usePosts();
        return (
            <div>
            
                <PostsPreviewFeed posts={posts} />
            </div>
        );
    };

    export default HomePage;