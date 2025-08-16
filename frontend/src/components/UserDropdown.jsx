import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UserDropdown.module.css";
import defaultAvatar from "../assets/defaultAvatar.png";

export function UserDropdown() {
  const { id, logout } = useAuth();
  const { user } = useProfile();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={toggleButtonRef} onClick={() => setOpen(!open)}>
        {id ? (
          <img
            src={(user && user.avatar) ? user.avatar : defaultAvatar}
            width="50"
            height="50"
            className={styles.profileImg}
          />
        ) : (
          "\u{1F464}"
        )}
      </div>
      {open && (
        <div className={styles.dropDownContainer} ref={dropdownRef}>
          {id && (
            <ul>
              <li>
                <Link to="/settings">Settings {"\u{1F6E0}"}</Link>
              </li>
              <li>
                <p
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout {"\u{1F422}"}
                </p>
              </li>
            </ul>
          )}
          {!id && (
            <ul>
              <li>
                <Link to="/login">Login {"\u{1F43E}"}</Link>
              </li>
              <li>
                <Link to="/register">Register {"\u{1F415}"}</Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
