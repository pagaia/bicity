import Head from 'next/head';
import Link from 'next/link';

const Header = (props) => {
    return (
        <>
            <Head>
                <title>BiCity - city for cyclists</title>
                <meta name="description" content="BiCity - city for cyclists" />
                <link rel="icon" href="/favicon.ico" />

                {/* Bootstrap */}
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                    crossOrigin="anonymous"
                />

                {/* <!-- Font Awesome --> */}
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
                    rel="stylesheet"
                />
                {/* <!-- Google Fonts --> */}
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    rel="stylesheet"
                />
                {/* <!--  markercluster --> */}
                <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

                <link
                    rel="stylesheet"
                    href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
                />
            </Head>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link href="/" className="navbar-brand">
                        <a>Home</a>
                    </Link>
                    <Link href="/features/new-feature">
                        <a>Add new feature</a>
                    </Link>
                    <Link href="/admin/user">
                        <a>User</a>
                    </Link>
                    <Link href="/credits">
                        <a>Credits</a>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Header;
