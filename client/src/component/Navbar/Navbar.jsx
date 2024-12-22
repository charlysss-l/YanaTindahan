import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
        <h1 className={styles.logo}>Yana's Tindahan</h1>
        <ul className={styles.navUL}>
            <li className={styles.navLI}>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                >
                  Home
                </NavLink>
            </li>
            <li className={styles.navLI}>
                <NavLink 
                  to="/products" 
                  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                >
                  Product
                </NavLink>
            </li>
            <li className={styles.navLI}>
                <NavLink 
                  to="/sales" 
                  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                >
                  Sales
                </NavLink>
            </li>
        </ul>
    </nav>
  );
}

export default Navbar;
