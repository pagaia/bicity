import Head from 'next/head';
import Link from 'next/link';
import { ROUTES } from '../../utils/routes';
import { ScreenSize } from './ScreenSize';

const Header = (props) => {
    return (
        <>
            <Head>
                <title>BiCity - city for cyclists</title>
            </Head>
            <div className="">
                <ScreenSize/>
                <nav className="navbar navbar-expand-lg navbar-light fixed-bottom  menu">
                    <div className="container">
                        <Link href={ROUTES.HOME} className="navbar-brand">
                            <a>
                                <div>
                                    <i className="fas fa-map-marked-alt fa-1-5x"></i>
                                </div>
                                <div className="menu-txt">Home</div>
                            </a>
                        </Link>
                        <Link href={ROUTES.NEW_FEATURE}>
                            <a>
                                <div>
                                    <i className="fas fa-plus-circle fa-1-5x"></i>
                                </div>
                                <div className="menu-txt">Add</div>
                            </a>
                        </Link>
                        <Link href={ROUTES.USER}>
                            <a>
                                <div>
                                    <i className="fas fa-user fa-1-5x"></i>
                                </div>
                                <div className="menu-txt">User</div>
                            </a>
                        </Link>
                        <Link href={ROUTES.ABOUT}>
                            <a>
                                <div>
                                    <i className="fas fa-copyright  fa-1-5x"></i>
                                </div>
                                <div className="menu-txt">About</div>
                            </a>
                        </Link>
                        {/* <Link href={ROUTES.SETTINGS}>
                            <a>
                                <div>
                                    <i class="fas fa-cog  fa-1-5x"></i>
                                </div>
                                <div className="menu-txt">Settings</div>
                            </a>
                        </Link> */}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
