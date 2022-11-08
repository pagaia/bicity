import Head from 'next/head';
import Link from 'next/link';
import { ROUTES } from '../../utils/routes';

const Header = (props) => {
    return (
        <>
            <Head>
                <title>BiCity - city for cyclists</title>
            </Head>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-bottom  menu">
                    <div className="container">
                        <Link href={ROUTES.HOME}>
                            <div>
                                <i className="fas fa-map-marked-alt fa-1-5x"></i>
                            </div>
                            <div className="menu-txt">Home</div>
                        </Link>
                        <Link href={ROUTES.NEW_FEATURE}>
                            <div>
                                <i className="fas fa-plus-circle fa-1-5x"></i>
                            </div>
                            <div className="menu-txt">Add</div>
                        </Link>
                        <Link href={ROUTES.USER}>
                            <div>
                                <i className="fas fa-user fa-1-5x"></i>
                            </div>
                            <div className="menu-txt">User</div>
                        </Link>
                        <Link href={ROUTES.ABOUT}>
                            <div>
                                <i className="fas fa-copyright  fa-1-5x"></i>
                            </div>
                            <div className="menu-txt">About</div>
                        </Link>
                        {/* <Link href={ROUTES.SETTINGS}>
                            
                                <div>
                                    <i className="fas fa-cog  fa-1-5x"></i>
                                </div>
                                <div className="menu-txt">Settings</div>
                            
                        </Link> */}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
