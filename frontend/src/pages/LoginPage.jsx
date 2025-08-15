// RegistrationPage.jsx
import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed


const LoginPage = () => {
    const { addToastMessage } = useToast();
    const {register, handleSubmit, formState: { errors }} = useForm();
    const { login, token } = useAuth();

    useEffect( () => {
        if (errors.email){
            addToastMessage(errors.email.message, "error");
        }
    }, [errors.email]);

    const handleLogin = (data) => {
        login(data.email, data.password);
        //Put Request Here
        console.log(data)
    }

    if(!token) {
    return (
        <form className="w-100 flex flex-wrap justify-center" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-row w-l text-center">
                <div className="formGroup my-2">
                    <label>Email:</label><br />
                    <input 
                        type="email" 
                        {...register("email", { 
                            required: true, 
                            pattern: {
                                value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm, 
                                message:"Please use a proper email address"
                            }
                        })} 
                    />
                </div>
                <div className="formGroup my-2">
                    <label>Password:</label><br />
                    <input type="password" {...register("password", { required: true})} />
                </div>
            </div>
            <div className="w-l no-flex text-center"><input type="submit" value="Login" className="button"/></div>
        </form>
    );
    }else{
        return (
            <h2 className="my-2 text-center">Already Logged In!</h2>
        );
    }
};

export default LoginPage;