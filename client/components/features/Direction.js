import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectPosition } from '../../store/userSlice';
import ExternalLink from '../ExternalLink';

const Direction = ({ lat, long }) => {
    const position = useSelector(selectPosition);

    if (!lat || !long) {
        return null;
    }
    let url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&travelmode=bicycling`;
    if (position) {
        url += `&origin=${position?.lat},${position?.lng}`;
    }

    return (
        <div className="feature-prop">
            <span className="feature-icon">
                <i className="fas fa-directions"></i>
            </span>
            <span className="txt">
                <ExternalLink url={url}>Get directions</ExternalLink>
            </span>
        </div>
    );
};

Direction.propTypes = {
    lat: PropTypes.number,
    long: PropTypes.number,
};

export default Direction;
