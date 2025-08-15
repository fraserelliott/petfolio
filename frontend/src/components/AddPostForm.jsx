import React, {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import styles from "./AddPost.module.css";
import { useToast } from "../contexts/ToastContext";
import { usePosts } from "../contexts/PostsContext"
import { ImageUpload } from '../components/ImageUpload.jsx';
import { useAuth } from "../contexts/AuthContext"

export function AddPostForm( {setNewPost}) {
    // id, caption, image, likes, created_at, posted_by
    const { addToastMessage } = useToast();
    const {register, handleSubmit, formState: { errors }} = useForm();
    const { login, token } = useAuth();
    const {addPost} = usePosts();

    const [formData, setFormData] = useState([]);
    const [imageUrl,setImageUrl] = useState("./test.jpg");

    const handleCancel = () => {
        setNewPost(null);
    };

    const handleAddPost = (data) => {
        const timestamp = new Date().toISOString();

        const completeData = {
            ...data,
            //TODO: once image directory is sorted check this for functionality
            image: imageUrl,
            likes: 0,
            created_at: timestamp,
            // TODO: Link this to token once login page is integrated into the main branch
            posted_by: "testaccount"
        };
        addPost(completeData);
        login("test@test.com","test");
        console.log(completeData)
    }
    const handleImgUpload = (url) => {
        setImageUrl(url);
        //console.log(url);
    }

    return (
        <div className={styles.addPostContainer} onSubmit={handleSubmit(handleAddPost)}>
            <form>
                <div className={styles.addPostClose} onClick={handleCancel}>x</div>
                <h2>Add a new post</h2>
                <ImageUpload onUpload={handleImgUpload} />
                <div className="formGroup">
                    <label>Caption:</label><br />
                    <textarea
                        {...register("caption")}
                    />
                </div>
                <input type="submit" value="Add your Post!" />
            </form>
        </div>
    );
}