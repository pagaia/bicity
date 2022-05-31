import { useDispatch, useSelector } from 'react-redux';
import { selectFavoritesFeatures, setFavorite, removeFavorite } from '../../store/featureSlice';

const Favorite = ({ userId, featureId }) => {
    if (!userId || !featureId) {
        return null;
    }
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavoritesFeatures);
    const isFavorite = favorites?.find((fav) => fav._id === featureId);

    const handleClick = (e) => {
        e?.preventDefault();
        isFavorite
            ? dispatch(removeFavorite({ userId, featureId }))
            : dispatch(setFavorite({ userId, featureId }));
    };
    return (
        <a href="#likeit" onClick={handleClick} className="favorite">
            {isFavorite ? <i class="fas fa-heart"></i> : <i class="far fa-heart"></i>}
        </a>
    );
};

export default Favorite;
