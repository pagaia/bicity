import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { ROUTES } from '../../utils/routes';
import ExternalLink from '../ExternalLink';

const Footer = (props) => {
    // return <footer className={styles.footer}></footer>;
    return (
        <footer className={`container ${styles.footer}`}>
            <ExternalLink url="https://www.twitter.com/pagaia">
                Powered by{' '}
                <span className={styles.logo}>
                    <i className="fas fa-bicycle"></i>
                </span>
            </ExternalLink>

            <Link href={ROUTES.PRIVACY_POLICY}>
                <a>Privacy policy</a>
            </Link>
            <Link href={ROUTES.COPYRIGHT_POLICY}>
                <a>Copyright policy</a>
            </Link>
            <Link href={ROUTES.TERMS_OF_SERVICE}>
                <a>Terms of service</a>
            </Link>
        </footer>
    );
};

export default Footer;
