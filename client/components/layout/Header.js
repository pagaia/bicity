import Head from 'next/head';
import Link from 'next/link';

const Header = (props) => {
    return (
        <>
            <Head>
                <title>BiCity - city for cyclists</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light fixed-bottom  menu">
                    <div className="container-fluid">
                        <Link href="/" className="navbar-brand">
                            <a>
                                <div>
                                    <i className="fas fa-igloo fa-2x"></i>
                                </div>
                                <div className="menu-txt">Home</div>
                            </a>
                        </Link>
                        <Link href="/features/new-feature">
                            <a>
                                <div>
                                    <i className="fas fa-plus-circle fa-2x"></i>
                                </div>
                                <div className="menu-txt">Add</div>
                            </a>
                        </Link>
                        <Link href="/user">
                            <a>
                                <div>
                                    <i className="fas fa-user fa-2x"></i>
                                </div>
                                <div className="menu-txt">User</div>
                            </a>
                        </Link>
                        <Link href="/about">
                            <a>
                                <div>
                                    <i className="fas fa-copyright  fa-2x"></i>
                                </div>
                                <div className="menu-txt">About</div>
                            </a>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
