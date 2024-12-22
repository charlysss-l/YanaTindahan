import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className={styles.footer}>
        <p>Developed by: <Link to='https://github.com/charlysss-l'>Charlize Mikaela Nadela</Link> | 2024</p>
    </div>
  );
};

export default Footer;
