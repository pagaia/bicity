import { useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import { selectChoosenCategories, showModal } from '../../../store/categorySlice';
import { showError } from '../../../store/errorSlice';
import {
    fetchFeaturesByBbox,
    fetchMultiFeatures,
    resetFeatures,
    selectDatabases,
    selectShowFavorites,
    toggleFavorites,
} from '../../../store/featureSlice';
import { fetchOSMAmenities, resetAmenities } from '../../../store/osmSlice';
import { DATABASES, ERROR_MESSAGE, MIN_ZOOM } from '../../../utils/constants';
import ButtonToolbar from './ButtonToolbar';

const Toolbar = () => {
    const map = useMap();
    const { user } = useAuth();
    const dispatch = useDispatch();

    const setPosition = () => {
        map.locate({ setView: true, maxZoom: 16 });
    };

    const categories = useSelector(selectChoosenCategories).map((cat) => cat.name);
    const databases = useSelector(selectDatabases);
    const showFavorites = useSelector(selectShowFavorites);

    console.debug({ selectChoosenCategories: categories.join('|') });

    const fetchAmenity = () => {
        dispatch(
            fetchOSMAmenities({
                amenities: categories.join('|'),
                bbox: map.getBounds(),
            })
        );
    };

    const update = (categories) => {
        const bbox = map.getBounds();
        const zoom = map.getZoom();
        if (zoom < MIN_ZOOM) {
            alert('Please increase the zoom to reduce the number of results');
        } else {
            if (databases.find((db) => db.name === DATABASES.BICITY)?.selected) {
                dispatch(fetchMultiFeatures({ bbox }));
                dispatch(fetchFeaturesByBbox({ bbox, categories, throttle: 10000 }));
            } else {
                dispatch(resetFeatures());
            }
            if (databases.find((db) => db.name === DATABASES.OSM)?.selected) {
                fetchAmenity();
            } else {
                dispatch(resetAmenities());
            }
        }
    };

    const handleToggleFavorites = () => {
        const userId = user?.profile?._id;
        if (!userId) {
            dispatch(showError({ message: ERROR_MESSAGE.LOGIN_FIRST }));
        } else {
            dispatch(toggleFavorites());
        }
    };

    const buildButtons = (categories) => {
        console.debug({ buildButtons: categories });
        return [
            {
                iconClassName: 'fa-crosshairs',
                title: 'Center map to your location',
                action: setPosition,
            },
            {
                iconClassName: 'fa-edit',
                title: 'Select features to display',
                action: () => dispatch(showModal(true)),
            },
            {
                iconClassName: 'fa-redo',
                title: 'Search in this area',
                action: () => update(categories),
            },
            {
                defaultIconClassName: showFavorites ? 'fas' : 'far',
                iconClassName: 'fa-heart favorite',
                title: 'Show/hide favorites',
                action: handleToggleFavorites,
            },
        ];
    };
    return <ButtonToolbar buttons={buildButtons(categories)} />;
};

export default Toolbar;
