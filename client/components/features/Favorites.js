import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, selectFavoritesFeatures } from '../../store/featureSlice';

/**
 * this React component is used to fetch the categories as soon as the application starts
 *
 */
const Favorites = ({ userId }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavoritesFeatures);

    useEffect(() => {
        if (userId) {
            console.log({userId})
            dispatch(fetchFavorites({ userId }));
        }
    }, [userId]);

    console.log({ favorites });
    return null;
};

export default Favorites;
