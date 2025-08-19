import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePosts } from "../contexts/PostsContext";
import { useProfile } from "../contexts/ProfileContext";

export function ViewPost({ postID }) {
  const navigate = useNavigate();
  const location = useLocation();
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
        <div>
          <button onClick={() => removeQueryParam("pID")}>X</button>
        </div>
        {/*TODO: Add responsive design using flex row and flex-colum to make the comments go under the image */}
        {post && (
          <>
            <div className="post-image">
              <div className="post-header">
                <div>
                  <div className="post-author">
                    <img
                      src={post.author?.avatar || defaultAvatar}
                      alt={post.name}
                      className="avatar"
                    />
                    <span className="name">{post.author?.name || ""}</span>
                  </div>
                  <div>{post.caption}</div>
                </div>
                <div className="post-footer">
                  {/* <div className="post-footer" onClick="{ TODO: }"> */}
                  <span className="likes">🦴 {post.likes} treats </span>
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
