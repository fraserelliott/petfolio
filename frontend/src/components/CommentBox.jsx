import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePosts } from "../contexts/PostsContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export function CommentBox({ postsId, setComments }) {
    const { addToastMessage } = useToast();
    const { addComment, getCommentsForPostAsync } = usePosts();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { login, token } = useAuth();

    const handleAddComment = async (data) => {
        const text = data.text
        //console.log(text, postsId);
        await addComment({text, postsId});

        //Refetch Comments
        const updatedComments = await getCommentsForPostAsync(postsId);
        setComments(updatedComments);

        reset();
    };

    const displayErrors = (errors) => {
    if (errors.caption?.type === "required")
        return addToastMessage("Please add a caption", "error");
    };

    if(!token){
        return (
            <Link to="/login">login to comment</Link>
        );
    }
    return (
        <div
          className=""
          onSubmit={handleSubmit(handleAddComment, displayErrors)}
        >
          <form className="">
            <div className="formGroup">
              <textarea {...register("text", { required: true })} rows="4" />
            </div>
            <input type="submit" value="comment" />
          </form>
        </div>
    );
}