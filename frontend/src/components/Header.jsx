import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Header.module.css";
import { useAuth } from "../contexts/AuthContext";
import { UserDropdown } from "./UserDropdown";
import { AddPost } from "./AddPost";

export const Header = () => {
  const { token } = useAuth();

  return (
    <header className={styles.container}>
      <div className={styles.columnGroup}>
        <Link to="/">
          <img src={logo} height="50" />
        </Link>
        <h1>Build your pet's online portfolio.</h1>
      </div>
      <Navbar />
      {!token && (
        <AddPost />
      )}
      <UserDropdown />
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
