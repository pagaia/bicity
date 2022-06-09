import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTotalFeatures, selectTotalFeatures
} from '../../store/featureSlice';

const TotalFeatures = ({ userId }) => {
    const dispatch = useDispatch();
    const votes = useSelector(selectTotalFeatures);

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchTotalFeatures({ userId }));
        }, 2000);
    }, []);

    if (!userId) {
        return null;
    }
    return (
        <>
            <h4>{votes}</h4>
            <p className="mb-0 text-muted">Total features added</p>
        </>
    );
};

export default TotalFeatures;
