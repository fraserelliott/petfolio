import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../contexts/ToastContext";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RegPage = () => {
  const { register, handleSubmit } = useForm();
  const { addToastMessage } = useToast();
  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const registerUser = (data) => {
    if (data.password !== data.passwordConf) {
      addToastMessage("Passwords don't match", "error");
      return;
    }
    api.post("/api/users", data).then((res) => {
      login(data.email, data.password);
      navigate("/");
    });
  };

  const displayErrors = (errors) => {
    if (errors.name?.type === "required" || errors.name?.type === "pattern")
      return addToastMessage("Please enter your full name", "error");

    if (errors.email?.type === "required" || errors.email?.type === "pattern")
      return addToastMessage("Please enter a valid email address", "error");

    if (
      errors.password?.type === "required" ||
      errors.passwordConf?.type === "required"
    )
      return addToastMessage("Password is required", "error");

    if (
      errors.password?.type === "minLength" ||
      errors.passwordConf?.type === "minLength"
    )
      return addToastMessage("Password must be at least 8 characters", "error");
  };

  

  return (
    <div className="w-100 flex flex-wrap justify-center">
      <form className="card card-list form-row py-4 text-center" onSubmit={handleSubmit(registerUser, displayErrors)}>
        <div className="formGroup my-2">
          <label>Full Name:</label>
          <br />
          <input
            {...register("name", {
              required: true,
              pattern: /^[a-z ,.'-]+$/i,
            })}
          />
        </div>
        <div className="formGroup my-2">
          <label>Email:</label>
          <br />
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
            })}
          />
        </div>
        <div className="formGroup my-2">
          <label>Password:</label>
          <br />
          <input
            type="password"
            {...register("password", { required: true, minLength: 8 })}
          />
        </div>
        <div className="formGroup my-2">
          <label>Confirm Password:</label>
          <br />
          <input
            type="password"
            {...register("passwordConf", { required: true, minLength: 8 })}
          />
        </div>
        <div className="formGroup my-2 text-center">
          <input type="submit" value="Register" className="button" />
        </div>
      </form>
    </div>
  );
};

export default RegPage;
