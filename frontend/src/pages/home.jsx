    import React from 'react';
    import PostsPreviewFeed from '../components/PostsPreviewFeed';
    import {usePosts} from '../contexts/PostsContext';    

    const Home = () => {
        const {posts} =usePosts();
        return (
            <div>
            
                <PostsPreviewFeed posts={posts} />
            </div>
        );
    };

    export default Home;