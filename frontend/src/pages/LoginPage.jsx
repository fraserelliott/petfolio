// RegistrationPage.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { addToastMessage } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleLogin = (data) => {
    login(data.email, data.password);
  };

  const displayErrors = (errors) => {
    if (
      errors.email?.type === "required" ||
      errors.password?.type === "required"
    )
      return addToastMessage(
        "Please complete both the email and password",
        "error"
      );

    if (errors.email?.type === "pattern")
      return addToastMessage("Please enter a valid email address", "error");
  };

  return (
    <form
      className="w-100 flex flex-wrap justify-center"
      onSubmit={handleSubmit(handleLogin, displayErrors)}
    >
      <div className="form-row w-l text-center">
        <div className="formGroup my-2">
          <label>Email:</label>
          <br />
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
              },
            })}
          />
        </div>
        <div className="formGroup my-2">
          <label>Password:</label>
          <br />
          <input
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <input type="submit" value="Login" className="button" />
      </div>
    </form>
  );
};

export default LoginPage;
