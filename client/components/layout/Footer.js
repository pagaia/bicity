import styles from '../../styles/Home.module.css';
import Image from 'next/image';

const Footer = (props) => {
    return <footer className={styles.footer}></footer>;
    return (
        <footer className={styles.footer}>
            <a href="https://www.twitter.com/pagaia" target="_blank" rel="noopener noreferrer">
                Powered by{' '}
                <span className={styles.logo}>
                    <Image src="/bicycle.png" alt="Author on bike" width="30%" height="30%" />
                </span>
            </a>
        </footer>
    );
};

export default Footer;
