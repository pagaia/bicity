import { Provider } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';
import Layout from '../components/layout/Layout';
import RefreshToken from '../components/user/RefreshToken';
import { ProvideAuth } from '../hooks/useAuth';
import store from '../store/reducers';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ProvideAuth>
                <RefreshToken/>
                <Layout>
                    <ErrorMessage />
                    <Component {...pageProps} />
                </Layout>
            </ProvideAuth>
        </Provider>
    );
}

export default MyApp;
