import axios from 'axios';
import { ERROR_MESSAGES } from '../../server/src/utility/constants';
import { showError } from '../store/errorSlice';
import { resetFavorites } from '../store/featureSlice';
import { sessionExpired } from '../store/userSlice';

const Interceptors = (store) => {
    // Define interceptor for response
    const interceptSessionTimeout = (error) => {
        console.debug({ error });
        console.debug({ status: error.response.status });

        if (
            error.response.status === 401 &&
            error.response.data.message === ERROR_MESSAGES.TOKEN_EXPIRED
        ) {
            console.debug('status 401');
            console.debug({ message: error?.response?.data?.message });
            try {
                store.dispatch(sessionExpired());
                store.dispatch(showError({ message: 'Session expired' }));
                store.dispatch(resetFavorites());
            } catch (error) {
                console.error(error);
            }
        }
        return Promise.reject(error);
    };

    axios.interceptors.response.use((response) => response, interceptSessionTimeout);
};
export default Interceptors;
