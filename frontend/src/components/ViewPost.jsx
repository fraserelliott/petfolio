import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { useProfile } from '../contexts/ProfileContext';
import { useAuth } from '../contexts/AuthContext';
import { CommentBox } from './CommentBox';

export function ViewPost({ postID }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { getProfileByID } = useProfile;
    const { posts, getPostByID, getCommentsForPostAsync } = usePosts();
    const { token, id } = useAuth();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    

    useEffect(() => {
        if (posts && postID) {
            setPost(getPostByID(postID));

            const fetchComments = async () => {
                const comments = await getCommentsForPostAsync(postID);
                setComments(comments);
            };

            fetchComments();
        }
    }, [posts, postID, getPostByID, getCommentsForPostAsync]);
    //DEBUG
    console.log(post,comments);
    
    const removeQueryParam = (paramKey) => {

        const queryParams = new URLSearchParams(location.search);
        queryParams.delete(paramKey);

    // Build new URL without the parameter
    const newSearch = queryParams.toString();
    const newPath = `${location.pathname}${newSearch ? "?" + newSearch : ""}`;

    // Navigate and reload
    navigate(newPath);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("viewpost-container")) {
      removeQueryParam("pID");
    }
  };

  return (
    <div className="viewpost-container" onClick={handleOverlayClick}>
        <div className="viewpost-content">
          <div className="card card-view">
            
            <header>
              <div className="close-button" onClick={() => removeQueryParam("pID")}>
                x
              </div>
              {post && (
              <>
              <img
                src={post.author?.avatar || defaultAvatar}
                alt={post.name}
                className="avatar"
              />
              <span className="username">{post.author?.name || ""}</span>
              </>
              )}
            </header>

            <div className="card-image">
              {post && (
              <img src={post.image} alt="post" />
              )}
            </div>

            <footer>
              {post && (
              <>
              <span className="caption">{post.caption}</span>
              <span className="likes">🦴 {post.likes} treats</span>
              </>
              )}
            </footer>
          </div>

            <div className="card card-comments">
                {post && (
                <>
                <ul className="m-0 p-1">
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((comment) => (
                        <li className="m-0 py-1" key={comment.id}>
                            <div className="username">{comment.commenter?.name}</div>
                            <div>{comment.text} </div>
                            { token && id === comment.commenter?.id && 
                              <div className="card-comments-options"><span>edit</span><span>delete</span></div>
                            }
                        </li>
                    ))
                ) : (
                    <p>No Comments Available</p>
                )}
                </ul>
                <CommentBox postsId={post.id} setComments={setComments} />
                </>
              )}
            </div>
        </div>
    </div>
  );
}
