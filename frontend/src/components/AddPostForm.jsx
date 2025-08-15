import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import styles from "./AddPost.module.css";
import { useToast } from "../contexts/ToastContext";
import { usePosts } from "../contexts/PostsContext"
import { useAuth } from "../contexts/AuthContext"

export function AddPostForm() {
    // id, caption, image, likes, created_at, posted_by
    const { addToastMessage } = useToast();
    const {register, handleSubmit, formState: { errors }} = useForm();
    const { login, token } = useAuth();

    const handleAddPost = (data) => {
        console.log(data)
    }

    return (
        <div className={styles.addPostContainer}>
            <form>
                <h2>Hello this is a form</h2>
            </form>
        </div>
    );
}