import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./AddPost.module.css";
import { useToast } from "../contexts/ToastContext";
import { usePosts } from "../contexts/PostsContext";
import { ImageUpload } from "../components/ImageUpload.jsx";
import { useAuth } from "../contexts/AuthContext";

export function AddPostForm({ onClose }) {
  // id, caption, image, likes, created_at, posted_by
  const { addToastMessage } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, token } = useAuth();
  const { addPost } = usePosts();

  const [imageUrl, setImageUrl] = useState("");

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleAddPost = (data) => {
    if (!imageUrl)
      return addToastMessage("Please upload an image for your post", "error");

    const completeData = {
      ...data,
      image: imageUrl,
      likes: 0,
    };

    addPost(completeData);
    handleClose();
  };

  const handleImgUpload = (url) => {
    setImageUrl(url);
  };

  const handleImgDelete = () => {
    setImageUrl("");
  };

  const displayErrors = (errors) => {
    if (errors.caption?.type === "required")
      return addToastMessage("Please add a caption", "error");
  };

  return (
    <div
      className={`card card-list w-100 flex flex-wrap justify-center text-center ${styles.addPostContainer}`}
      onSubmit={handleSubmit(handleAddPost, displayErrors)}
    >
      <form>
        <div className={`close-button ${styles.addPostClose}`} onClick={handleClose}>
          x
        </div>
        <h2>Add a new post</h2>
        <ImageUpload onUpload={handleImgUpload} onDelete={handleImgDelete} />
        <div className="formGroup">
          <label>Caption:</label>
          <textarea {...register("caption", { required: true })} rows="4" />
        </div>
        <input type="submit" value="Add your Post!" />
      </form>
    </div>
  );
}
