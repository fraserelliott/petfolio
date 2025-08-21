import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePosts } from "../contexts/PostsContext";
import { useAuth } from "../contexts/AuthContext";
import defaultAvatar from "../assets/defaultAvatar.png";
import { CommentBox } from "./CommentBox";

const sortByCreatedAt = (comments, order = "desc") =>
  [...comments].sort((a, b) =>
    order === "asc"
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt)
  );

export function ViewPost({ postID }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { posts, getPostByID, getCommentsForPostAsync } = usePosts();
  const { token, id } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!posts || !postID) return;

    // Get the post from context/state
    const found = getPostByID(postID);
    setPost(found || null);

    // Fetch comments for the post
    (async () => {
      const list = await getCommentsForPostAsync(postID);
      setComments(sortByCreatedAt(list));
    })();
    // Depend on posts and postID so it re-evaluates when posts load/change
  }, [posts, postID, getPostByID, getCommentsForPostAsync]);

  const handleNewComment = async (comment) => {
    if (comment) {
      setComments((prev) => sortByCreatedAt([...prev, comment]));
    }
    const list = await getCommentsForPostAsync(postID);
    setComments(sortByCreatedAt(list));
  };

  const removeQueryParam = (paramKey) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete(paramKey);

    const newSearch = queryParams.toString();
    const newPath = `${location.pathname}${newSearch ? "?" + newSearch : ""}`;
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
            <div
              className="close-button"
              onClick={() => removeQueryParam("pID")}
            >
              x
            </div>

            {post && (
              <>
                <img
                  src={post.author?.avatar || defaultAvatar}
                  alt={post.author?.name || "author"}
                  className="avatar"
                />
                <span className="username">{post.author?.name || ""}</span>
              </>
            )}
          </header>

          <div className="card-image">
            {post && <img src={post.image} alt="post" />}
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
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <li className="m-0 py-1" key={comment.id}>
                      <div className="username">{comment.commenter?.name}</div>
                      <div>{comment.text}</div>
                      {token && id === comment.commenter?.id && (
                        <div className="card-comments-options">
                          <span>edit</span>
                          <span>delete</span>
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <p>No Comments Available</p>
                )}
              </ul>

              <CommentBox postsId={post.id} onAddComment={handleNewComment} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
