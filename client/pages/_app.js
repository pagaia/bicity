import { Provider } from 'react-redux';
import Category from '../components/categories/Category';
import ErrorMessage from '../components/ErrorMessage';
import BetaVersion from '../components/layout/BetaVersion';
import Layout from '../components/layout/Layout';
import RefreshToken from '../components/user/RefreshToken';
import { ProvideAuth } from '../hooks/useAuth';
import store from '../store/reducers';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ProvideAuth>
                <BetaVersion/>
                <RefreshToken />
                <Category />
                <Layout>
                    <ErrorMessage />
                    <Component {...pageProps} />
                </Layout>
            </ProvideAuth>
        </Provider>
    );
}

export default MyApp;
