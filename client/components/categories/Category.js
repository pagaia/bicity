import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories } from '../../store/categorySlice';

/**
 * this React component is used to fetch the categories as soon as the application starts
 *
 */
const Category = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    console.debug({ categories });
    return null;
};

export default Category;