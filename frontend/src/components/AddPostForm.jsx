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
    if (onClose)
      onClose();
  };

  const handleAddPost = (data) => {
    const completeData = {
      ...data,
      image: imageUrl,
      likes: 0
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

  return (
    <div
      className={styles.addPostContainer}
      onSubmit={handleSubmit(handleAddPost)}
    >
      <form>
        <div className={styles.addPostClose} onClick={handleClose}>
          x
        </div>
        <h2>Add a new post</h2>
        <ImageUpload onUpload={handleImgUpload} onDelete={handleImgDelete} />
        <div className="formGroup">
          <label>Caption:</label>
          <br />
          <textarea {...register("caption")} rows="4" />
        </div>
        <input type="submit" value="Add your Post!" />
      </form>
    </div>
  );
}
