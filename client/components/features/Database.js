import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDatabases, selectDatabases } from '../../store/featureSlice';

/**
 * this React component is used to fetch the categories as soon as the application starts
 *
 */
const DatabaseLoad = () => {
    const dispatch = useDispatch();
    const databases = useSelector(selectDatabases);

    useEffect(() => {
        dispatch(loadDatabases());
    }, []);

    return null;
};

export default DatabaseLoad;
