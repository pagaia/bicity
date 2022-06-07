import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
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
                <meta name="application-name" content="BiCity info" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="BiCity info" />
                <meta name="description" content="Bicycle info for cyclists around the world" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#000000" />

                <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-touch-icon.png" />

                <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta
                    name="twitter:card"
                    content="BiCity info - the application for cyclists around the world"
                />
                <meta name="twitter:url" content="https://www.bicity.info" />
                <meta name="twitter:title" content="BiCity info" />
                <meta
                    name="twitter:description"
                    content="BiCity info - the application for cyclists around the world"
                />
                <meta name="twitter:image" content="https://www.bicity.info/bicity-logo.jpg" />
                <meta name="twitter:creator" content="@pagaia" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="BiCity info" />
                <meta
                    property="og:description"
                    content="BiCity info - the application for cyclists around the world"
                />
                <meta property="og:site_name" content="BiCity info" />
                <meta property="og:url" content="https://www.bicity.info" />
                <meta property="og:image" content="https://www.bicity.info/bicity-logo.jpg" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
