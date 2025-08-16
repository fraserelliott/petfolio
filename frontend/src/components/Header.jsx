import { Link, NavLink } from "react-router-dom";
import {useState} from 'react';
import logo from "../assets/logo.png";
import styles from "./Header.module.css";
import { useAuth } from "../contexts/AuthContext";
import { UserDropdown } from "./UserDropdown";
import { AddPostForm } from "./AddPostForm";

export const Header = () => {
  const { token } = useAuth();
  const [showNewPost, setShowNewPost] = useState(false);

  return (
    <header className={styles.container}>
      <div className={styles.columnGroup}>
        <Link to="/">
          <img src={logo} height="50" />
        </Link>
        <h1>Build your pet's online portfolio.</h1>
      </div>
      <Navbar />
      {token ? (
        <div onClick={() => setShowNewPost(true)} className={styles.columnGroup}>
          <h1 className={styles.marker}>+</h1>
          <h1>Add a New Post</h1>
        </div>
      ) : (
        <Link to="/register">
          <div className={styles.columnGroup}>
            <h1 className={styles.marker}>+</h1>
            <h1>Create Your Petfolio</h1>
          </div>
        </Link>
      )}
      <UserDropdown />
      {showNewPost && <AddPostForm onClose={() => setShowNewPost(false)} />}
    </header>
  );
};

const pages = [
  { name: "Home", to: "/" },
  { name: "Following", to: "/following" },
];

const Navbar = () => {
  const { token } = useAuth();

  const renderPageLink = (name, to) => {
    return (
      <li key={name}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.selected}` : styles.navItem
          }
        >
          {name}
        </NavLink>
      </li>
    );
  };

  return (
    <ul className={styles.navList}>
      {renderPageLink("Home", "/")}
      {token && renderPageLink("Following", "/following")}
    </ul>
  );
};
