import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Header.module.css";
import { useAuth } from '../contexts/AuthContext';
import { UserDropdown } from "./UserDropdown";

export const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.logoGroup}>
        <Link to="/">
          <img src={logo} height="50" />
        </Link>
        <h1>Build your pet's online portfolio.</h1>
      </div>
      <Navbar />
      <UserDropdown />
    </header>
  );
};

const pages = [
  {name: "Home", to: "/"},
  {name: "Following", to: "/following"},
];

const Navbar = () => {
  const { token } = useAuth();

  const renderPageLink = (name, to) => {
    return (
      <li
        key={name}>
        <NavLink
          to={to}
          className={({isActive}) =>
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
      { renderPageLink('Home', '/')}
      { token && renderPageLink('Following', '/following')}
    </ul>
  )
};