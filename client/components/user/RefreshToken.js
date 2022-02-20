const { useEffect } = require('react');
const { useAuth } = require('../../hooks/useAuth');
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken, selectUser } from '../../store/userSlice';

const RefreshToken = () => {
    const { setUser } = useAuth();

    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    useEffect(() => {
        setUser(user);
    }, [user]);

    // check if the user is logged in and retrieve the information
    useEffect(async () => {
        dispatch(refreshToken());
    }, []);

    return null;
};

export default RefreshToken;
