import { useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { selectChoosenCategories, showModal } from '../../../store/categorySlice';
import {
    fetchFeaturesByBbox,
    fetchMultiFeatures,
    selectDatabases,
    selectShowFavorites,
    showFavorites,
    toggleFavorites,
} from '../../../store/featureSlice';
import { fetchOSMAmenities } from '../../../store/osmSlice';
import { DATABASES, MIN_ZOOM } from '../../../utils/constants';
import ButtonToolbar from './ButtonToolbar';

const Toolbar = () => {
    const map = useMap();

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
            }
            if (databases.find((db) => db.name === DATABASES.OSM)?.selected) {
                fetchAmenity();
            }
        }
    };

    const buildButtons = (categories) => {
        console.debug({ buildButtons: categories });
        return [
            {
                iconClassName: 'fa-bullseye',
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
                action: () => dispatch(toggleFavorites()),
            },
        ];
    };
    return <ButtonToolbar buttons={buildButtons(categories)} />;
};

export default Toolbar;
