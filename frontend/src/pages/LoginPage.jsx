// RegistrationPage.jsx
import React from 'react';
import { useForm } from "react-hook-form";

const LoginPage = () => {
    const {register, handleSubmit} = useForm();
    const putUser = (data) => {
        //Put Request Here
        console.log(data)
    }

    const handleUpload = (url) => {
        console.log(url);
    }
    return (
        <form onSubmit={handleSubmit(putUser)}>
            <div className="form-row w-l text-center">
                <div className="formGroup my-2">
                    <label>Full Name:</label><br />
                    <input {...register("fullName", { required: true, pattern: /^[a-z ,.'-]+$/i })} />
                </div>
                <div className="formGroup my-2">
                    <label>Email:</label><br />
                    <input type="email" {...register("email", { required: true, pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm })} />
                </div>
                <div className="formGroup my-2">
                    <label>Password:</label><br />
                    <input type="password" {...register("password", { required: true})} />
                </div>
                <div className="formGroup my-2">
                    <label>Confirm Password:</label><br />
                    <input type="passwordConf" {...register("password", { required: true})} />
                </div>
            </div>
            <div className="w-l no-flex text-center"><input type="submit" value="Register" className="button"/></div>
        </form>
    );
};

export default LoginPage;