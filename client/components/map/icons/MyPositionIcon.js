import L from 'leaflet';
import { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { FeatureContext } from '../../../context/FeatureContext';

const MyPositionIcon = L.divIcon({
    html: '<i class="fas fa-circle "></i>',
    iconSize: [20, 20],
    className: 'my-position',
});

const MyPosition = () => {
    const { position } = useContext(FeatureContext);
    if (!position) {
        return null;
    }

    return (
        <Marker position={[position.lat, position.lng]} icon={MyPositionIcon}>
            <Popup>You are here: {`${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`}</Popup>
        </Marker>
    );
};

export default MyPosition;
