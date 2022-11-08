const { useEffect } = require('react');
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { refreshToken, selectUser } from '../../store/userSlice';

const RefreshToken = () => {
    const { setUser } = useAuth();

    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    // send a refresh token to get the new JWT token for the user
    useEffect(() => {
        // call the first refresh token
        dispatch(refreshToken());

        // call again every 29 minutes to renew session if the user selected rememberme
        const intervalID = setInterval(() => dispatch(refreshToken()), 29 * 60 * 1000);
        return () => {
            clearInterval(intervalID);
        };
    }, []);

    // if the user from redux store changes, get the info and set into the Auth Context
    useEffect(() => {
        setUser(user);
    }, [user]);

    return null;
};

export default RefreshToken;
