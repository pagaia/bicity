const { useEffect } = require('react');
const { useAuth } = require('../../hooks/useAuth');
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken, selectUser } from '../../store/userSlice';

const RefreshToken = () => {
    const { setUser } = useAuth();

    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    // send a refresh token to get the new JWT token for the user
    useEffect(() => {
        dispatch(refreshToken());
    }, []);

    // if the user from redux store changes, get the info and set into the Auth Context
    useEffect(() => {
        setUser(user);
    }, [user]);

    return null;
};

export default RefreshToken;
