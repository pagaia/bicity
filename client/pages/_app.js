import Layout from '../components/layout/Layout';
import { ProvideAuth } from '../hooks/useAuth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <ProvideAuth>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ProvideAuth>
    );
}

export default MyApp;
