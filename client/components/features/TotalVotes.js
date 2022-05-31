import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalVotes, selectTotalVotes } from '../../store/featureSlice';

const TotalVotes = ({ userId }) => {
    const dispatch = useDispatch();
    const votes = useSelector(selectTotalVotes);

    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchTotalVotes({ userId }));
        }, 2000);
    }, []);

    if (!userId) {
        return null;
    }
    return (
        <>
            <h4>{votes}</h4>
            <p className="mb-0 text-muted">Total votes added</p>
        </>
    );
};

export default TotalVotes;
