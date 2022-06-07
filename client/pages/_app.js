import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Category from '../components/categories/Category';
import ErrorMessage from '../components/ErrorMessage';
import DatabaseLoad from '../components/features/Database';
import Favorites from '../components/features/Favorites';
import BetaVersion from '../components/layout/BetaVersion';
import Layout from '../components/layout/Layout';
import RefreshToken from '../components/user/RefreshToken';
import Interceptors from '../hooks/Interceptors';
import { ProvideAuth } from '../hooks/useAuth';
import store from '../store/reducers';
import '../styles/globals.css';


// initialiase TimeAgo library
TimeAgo.addDefaultLocale(en);

// define interceptor for session expiration
Interceptors(store);

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <Provider store={store}>
                <ProvideAuth>
                    <BetaVersion />
                    <RefreshToken />
                    <Category />
                    <DatabaseLoad />
                    <Favorites />
                    <Layout>
                        <ErrorMessage />
                        <Component {...pageProps} />
                    </Layout>
                </ProvideAuth>
            </Provider>
        </>
    );
}

export default MyApp;
