import { useDispatch, useSelector } from 'react-redux';
import { selectFavoritesFeatures, setFavorite } from '../../store/featureSlice';

const Favorite = ({ userId, featureId }) => {
    if (!userId || !featureId) {
        return null;
    }
    const dispatch = useDispatch();
    const isFavorite = useSelector(selectFavoritesFeatures).features?.find(
        (fav) => fav._id === featureId
    );

    const handleClick = (e) => {
        e?.preventDefault();
        dispatch(setFavorite({ userId, featureId }));
    };
    return (
        <a href="#likeit" onClick={handleClick}>
            {isFavorite ? <i class="fas fa-heart"></i> : <i class="far fa-heart"></i>}
        </a>
    );
};

export default Favorite;
