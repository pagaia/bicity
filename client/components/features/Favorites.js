import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { fetchFavorites, selectFavoritesFeatures } from '../../store/featureSlice';

/**
 * this React component is used to fetch the categories as soon as the application starts
 *
 */
const Favorites = () => {
    const { user = {} } = useAuth();

    const userId = user?.profile?._id;
    const dispatch = useDispatch();

    const favorites = useSelector(selectFavoritesFeatures);

    useEffect(() => {
        if (userId) {
            setTimeout(() => {
                console.debug({ userId });
                dispatch(fetchFavorites({ userId }));
            }, 2000);
        }
    }, [userId]);

    console.debug({ favorites });
    return null;
};

export default Favorites;
