import { Link, NavLink, useLocation } from "react-router-dom";
import {useState} from 'react';
import queryString from 'query-string';
import logo from "../assets/petfolio-logo-1.svg";
import styles from "./Header.module.css";
import PetfolioLogo from './PetfolioLogo';
import { useAuth } from "../contexts/AuthContext";
import { UserDropdown } from "./UserDropdown";
import { AddPostForm } from "./AddPostForm";
import { ViewPost } from "./ViewPost";

export const Header = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const { token } = useAuth();

  // Get the URL Parameters
  const location = useLocation();
  const searchParam  = location.search;
  const queryParams = queryString.parse(location.search);
  // set a postID variable to pass into the PostView Modal
  const postID = typeof queryParams.pID === 'undefined' ? null : queryParams.pID;

  return (
    <header className={styles.container}>
      <div className={styles.columnGroup}>
        <Link to="/">
          <PetfolioLogo size={260} animated />
        </Link>
        <h1>Build your pet's online portfolio.</h1>
      </div>
      <Navbar />
      {token ? (
        <div onClick={() => setShowNewPost(true)} className={styles.columnGroup}>
          <h1 className={styles.marker}>+</h1>
          <h2>Add a New Post</h2>
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

      {postID && <ViewPost postID={postID} />}

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
            isActive ? `button ${styles.navItem} ${styles.selected}` : `button ${styles.navItem}`
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
