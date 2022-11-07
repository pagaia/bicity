import { CATEGORY_ICON } from './constants';

const CategoryIconSimple = ({ category }) => {
    return <i class={`fas ${CATEGORY_ICON[category] || 'fa-map-pin'} category`}></i>;
};

export default CategoryIconSimple;
