import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { useProfile } from '../contexts/ProfileContext';

export function ViewPost({ postID }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { posts, getPostByID, getCommentsForPostAsync } = usePosts();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    

    useEffect(() => {
        if (posts) {
            setPost(getPostByID(postID));

            const fetchComments = async () => {
                const comments = await getCommentsForPostAsync(postID);
                setComments(comments);
            };

            fetchComments();
        }
    }, [posts]);
    

    //'ecd057a5-7502-4522-8b84-f8b52dbcc33a'
    console.log(post,comments)
    
    const removeQueryParam = (paramKey) => {

        const queryParams = new URLSearchParams(location.search);
        queryParams.delete(paramKey);

        // Build new URL without the parameter
        const newSearch = queryParams.toString();
        const newPath = `${location.pathname}${newSearch ? '?' + newSearch : ''}`;

        // Navigate and reload
        navigate(newPath);
        window.location.reload(); // Only needed if you want a hard reload
    };


    return (
        <div className="viewpost-container">
            <button onClick={() => removeQueryParam('pID')}>X</button>
            { post && 
                <div className="">
                    {/*TODO: Add responsive design using flex row and flex-colum to make the comments go under the image */ }
                    <div className="post-header">
                        <img src={post.author?.avatar || defaultAvatar} alt={post.name} className="avatar" />
                        <span className="name">{post.author?.name || ""}</span>
                    </div>
                    <div className="post-image">
                        <img src={post.image} alt="post"/>
                        <div>
                            {post.caption}
                        </div>
                    </div>
                    <div className="post-footer" onClick="{/* TODO: */}">
                        <span className="likes">🦴 {post.likes} treats </span>
                    </div>
                    <ul>
                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map((comment) => (
                            <li key={comment.id}>{comment.text}</li>
                        ))
                    ) : (
                        <p>No Comments Available</p>
                    )}
                    </ul>
                </div>
                
            }
            {}
        </div>
    )
}