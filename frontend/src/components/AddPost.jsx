import {useState, useEffect} from 'react';
import styles from "./AddPost.module.css";
import { useToast } from "../contexts/ToastContext";

export function AddPost() {
    const [newPost, setNewPost] = useState(null);
    const { addToastMessage } = useToast();

    useEffect(() => {
        if(newPost){
            console.log(newPost);
        }else{
            console.log(newPost);
        }
    }, [newPost])

    return (
        <div onClick={() => setNewPost(!newPost)} className={styles.columnGroup}>
            <h1 className={styles.marker}>+</h1>
            <h1>Create Your Petfolio</h1>

            {newPost && (
                <p>Add New Post Started</p>
            )}
        </div>
    );
}