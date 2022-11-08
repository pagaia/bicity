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

            <Link href={ROUTES.PRIVACY_POLICY}>Privacy policy</Link>
            <Link href={ROUTES.COPYRIGHT_POLICY}>Copyright policy</Link>
            <Link href={ROUTES.TERMS_OF_SERVICE}>Terms of service</Link>
        </footer>
    );
};

export default Footer;
