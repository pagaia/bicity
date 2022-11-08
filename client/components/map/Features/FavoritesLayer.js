import L from 'leaflet';
import { Marker } from 'react-leaflet';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useDispatch, useSelector } from 'react-redux';
import {
    featureSelected,
    selectFavoritesFeatures,
    selectShowFavorites,
} from '../../../store/featureSlice';

const fontAwesomeIcon = L.divIcon({
    html: '<i class="fas fa-heart fa-2x"></i>',
    iconSize: [20, 20],
    className: 'osm-icon',
});

const FavoritesLayer = (props) => {
    const showLayer = useSelector(selectShowFavorites);
    const favorites = useSelector(selectFavoritesFeatures);
    const dispatch = useDispatch();

    const onClick = (e, id) => {
        dispatch(featureSelected({ favorite: id }));
    };

    console.debug({ favorites, showLayer });
    if (!favorites || !showLayer) {
        return null;
    }

    return (
        <div>
            {favorites?.map((item) => {
                const lat = item.geometry.coordinates[1];
                const long = item.geometry.coordinates[0];

                return (
                    <Marker
                        position={[lat, long]}
                        key={item._id}
                        eventHandlers={{ click: (e) => onClick(e, item._id) }}
                        icon={fontAwesomeIcon}></Marker>
                );
            })}
        </div>
    );
};

export default FavoritesLayer;
