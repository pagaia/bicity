import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalFavorites, selectTotalFavorites } from '../../store/featureSlice';

const TotalFavorites = ({ userId }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(selectTotalFavorites);

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchTotalFavorites({ userId }));
        }, 2000);
    }, []);

    if (!userId) {
        return null;
    }
    return (
        <>
            <h4>{favorites}</h4>
            <p className="mb-0 text-muted">Total favorites</p>
        </>
    );
};

export default TotalFavorites;
