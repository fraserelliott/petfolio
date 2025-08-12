import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UserDropdown.module.css";

export function UserDropdown() {
  const { username, logout } = useAuth();
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
      <button ref={toggleButtonRef} onClick={() => setOpen(!open)}>
        {username ? `${username} \u{1F464}` : "\u{1F464}"}
      </button>
      {open && (
        <div className={styles.dropDownContainer} ref={dropdownRef}>
          {username && (
            <ul>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <p onClick={() => {
                  logout();
                  navigate("/");
                }}> Logout</p>
              </li>
            </ul>
          )}
          {!username && (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
