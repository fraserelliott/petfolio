// RegistrationPage.jsx
import React, {useEffect} from 'react';
import { useToast } from "../contexts/ToastContext";
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed


const HomePage = () => {
    const { addToastMessage } = useToast();
    const { login, token } = useAuth();

    return (
        <div>
            <div className="my-2">
                <h3>Top Posts</h3>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore totam officia, error voluptatem rerum omnis hic, adipisci quibusdam ad impedit repellat dignissimos ipsum sed facilis tempore officiis obcaecati, fugit magni.
                </div>
            </div>
            <div className="my-2">
                <h3>Recent Posts</h3>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore totam officia, error voluptatem rerum omnis hic, adipisci quibusdam ad impedit repellat dignissimos ipsum sed facilis tempore officiis obcaecati, fugit magni.
                </div>
            </div>
        </div>
    );
};

export default HomePage;