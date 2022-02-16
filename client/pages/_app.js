import Layout from '../components/layout/Layout';
import { ProvideAuth } from '../hooks/useAuth';
import '../styles/globals.css';
import store from '../store/reducers';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ProvideAuth>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ProvideAuth>
        </Provider>
    );
}

export default MyApp;
