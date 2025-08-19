import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { useProfile } from '../contexts/ProfileContext';

export function ViewPost({ postID }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { getProfileByID } = useProfile;
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
                <div><button onClick={() => removeQueryParam('pID')}>X</button></div>
                {/*TODO: Add responsive design using flex row and flex-colum to make the comments go under the image */ }
                { post &&
                <>
                <div className="card card-view">
                    <header>
                        <img src={post.author?.avatar || defaultAvatar} alt={post.name} className="avatar" />
                        <span className="username">{post.author?.name || ""}</span>
                    </header>

                    <div className="card-image">
                        <img src={post.image} alt="post"/>
                    </div>
    
                    <footer>
                    {/* <footer onClick="{ TODO: }"> */}
                        <span className="caption">{post.caption}</span>
                        <span className="likes">🦴 {post.likes} treats </span>
                    </footer>
                </div>

                <div className="card card-comments">
                    <ul className="m-0 p-1">
                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map((comment) => (
                            <li className="m-0 py-1" key={comment.id}>
                                <div className="username">{comment.commenter?.name}</div>
                                <div>{comment.text} </div>
                            </li>
                        ))
                    ) : (
                        <p>No Comments Available</p>
                    )}
                    </ul>
                </div>
              </div>
              <img src={post.image} alt="post" />
            </div>
            <div className="viewpost-comments">
              <ul>
                {Array.isArray(comments) && comments.length > 0 ? (
                  comments.map((comment) => (
                    <li className="viewpost-comment-holder" key={comment.id}>
                      <div>{comment.commenter?.name}</div>
                      <div>{comment.text} </div>
                    </li>
                  ))
                ) : (
                  <p>No Comments Available</p>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
