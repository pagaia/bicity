import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../store/errorSlice';
import { selectFavoritesFeatures, setFavorite, removeFavorite } from '../../store/featureSlice';
import { ERROR_MESSAGE } from '../../utils/constants';

const Favorite = ({ userId, featureId }) => {
    if (!featureId) {
        return null;
    }
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavoritesFeatures);
    const isFavorite = favorites?.find((fav) => fav._id === featureId);

    const handleClick = (e) => {
        e?.preventDefault();
        if (!userId) {
            dispatch(showError({ message: ERROR_MESSAGE.LOGIN_FIRST }));
        } else {
            isFavorite
                ? dispatch(removeFavorite({ userId, featureId }))
                : dispatch(setFavorite({ userId, featureId }));
        }
    };
    return (
        <a href="#likeit" onClick={handleClick} className="favorite">
            {isFavorite ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
        </a>
    );
};

export default Favorite;
