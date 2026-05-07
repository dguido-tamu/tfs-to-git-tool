import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import styles from './NavBar.module.css';

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <img 
            src={`${import.meta.env.BASE_URL}RBG-TAM-White.svg`} 
            alt="Texas A&M University logo" 
            width="75" 
            height="70" 
            className={styles.tamLogo} 
          />
          <span className={styles.appName}>Git Shift</span>
        </div>
      </div>
      
      <div className={styles.center}>
        <NavLink 
          to="/translate" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Translate
        </NavLink>
        <NavLink 
          to="/practice" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Practice
        </NavLink>
        <NavLink 
          to="/reference" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Reference
        </NavLink>
      </div>

      <div className={styles.right}>
        <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
}
