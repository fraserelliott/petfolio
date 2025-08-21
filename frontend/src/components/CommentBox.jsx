import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePosts } from "../contexts/PostsContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export function CommentBox({ postsId, onAddComment }) {
  const { addToastMessage } = useToast();
  const { addComment, getCommentsForPostAsync } = usePosts();
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddComment = async ({ text }) => {
    console.log("text: ", text);
    const comment = await addComment({ text, postsId });
    console.log("comment: ", comment);
    if (comment) {
      onAddComment(comment);
      reset();
    }
  };

  const displayErrors = (errs) => {
    if (errs.text?.type === "required") {
      addToastMessage("Please enter a comment", "error");
    }
  };

  if (!token) {
    return <Link to="/login">login to comment</Link>;
  }

  return (
    <div className="comment-box">
      <form
        className=""
        onSubmit={handleSubmit(handleAddComment, displayErrors)}
      >
        <div className="formGroup">
          <textarea
            className="textarea-noresize p-1"
            rows="4"
            placeholder="Leave your mark..."
            {...register("text", { required: true })}
          />
        </div>
        <input className="button" type="submit" value="comment" />
      </form>
    </div>
  );
}
