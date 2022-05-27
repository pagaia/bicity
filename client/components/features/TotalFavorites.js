import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalFavorites, selectTotalFavorites } from '../../store/featureSlice';

const TotalFavorites = ({ userId }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(selectTotalFavorites);

    useEffect(() => {
        dispatch(fetchTotalFavorites({ userId }));
    }, []);

    if (!userId) {
        return null;
    }
    return (
        <>
            <h4>{favorites}</h4>
            <p className="mb-0 text-muted">Total number of favorites</p>
        </>
    );
};

export default TotalFavorites;
