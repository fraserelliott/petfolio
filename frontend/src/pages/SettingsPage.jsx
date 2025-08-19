import { useProfile } from "../contexts/ProfileContext";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "../contexts/ToastContext";
import { ImageUpload } from "../components/ImageUpload";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useProfile();
  const { addToastMessage } = useToast();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { updateAccount } = useProfile();
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const profileForm = useForm({
    defaultValues: {},
  });

  const passwordForm = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });

      passwordForm.reset({ password: "", confirmPassword: "" });
    }
  }, [user, profileForm, passwordForm]);

  const displayProfileErrors = (errors) => {
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

  const displayPasswordErrors = (errors) => {
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

  const onProfileSubmit = (data) => {
    updateAccount(data.name, data.email, undefined, data.avatar);
  };

  const onPasswordSubmit = (data) => {
    if (data.password !== data.passwordConf) {
      addToastMessage("Passwords don't match", "error");
      return;
    }
    updateAccount(undefined, undefined, data.password, undefined);
  };

  if (user)
    return (
      <>
        <form
          onSubmit={profileForm.handleSubmit(
            onProfileSubmit,
            displayProfileErrors
          )}
        >
          <div className="form-row flex w-l align-center justify-center">
            <div className="mx-3 col">
              <div className="formGroup my-2">
                <label>Full Name:</label>
                <br />
                <input
                  {...profileForm.register("name", {
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
                  {...profileForm.register("email", {
                    required: true,
                    pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
                  })}
                />
              </div>
              <div className="formGroup my-2">
                <label>Avatar:</label>
                <br />
                <Controller
                  control={profileForm.control}
                  name="avatar"
                  render={({ field }) => (
                    <ImageUpload
                      src={field.value}
                      onUpload={(url) => field.onChange(url)}
                      onDelete={() => field.onChange("")}
                      width="150px"
                      height="150px"
                    />
                  )}
                />
              </div>
              <div className="formGroup my-2 text-center">
                <input type="submit" value="Update" className="button" />
              </div>
            </div>
          </div>
        </form>
        <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
          {showPasswordForm ? "Cancel Changing Password" : "Change Password"}
        </button>
        {showPasswordForm && (
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit, displayPasswordErrors)}>
            <div className="formGroup my-2">
              <label>New Password:</label>
              <br />
              <input
                type="password"
                {...passwordForm.register("password", {
                  required: true,
                  minLength: 8,
                })}
              />
            </div>
            <div className="formGroup my-2">
              <label>Confirm New Password:</label>
              <br />
              <input
                type="password"
                {...passwordForm.register("passwordConf", {
                  required: true,
                  minLength: 8,
                })}
              />
            </div>
            <div className="formGroup my-2 text-center">
              <input type="submit" value="Confirm" className="button" />
            </div>
          </form>
        )}
      </>
    );
};

export default ProfilePage;
