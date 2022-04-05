import { clearPreviewData } from 'next/dist/server/api-utils';
import { useState } from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { selectChoosenCategories } from '../../../store/categorySlice';
import { fetchFeatures, fetchMultiFeatures } from '../../../store/featureSlice';
import { fetchOSMAmenities } from '../../../store/osmSlice';
import { MIN_ZOOM } from '../../../utils/constants';
import Modal from '../../Modal';
import ButtonToolbar from './ButtonToolbar';

const Toolbar = () => {
    const map = useMap();
    const [viewModal, setModal] = useState(false);
    const dispatch = useDispatch();
    const setPosition = () => {
        map.locate({ setView: true, maxZoom: 16 });
    };

    const categories = useSelector(selectChoosenCategories).map((cat) => cat.name);

    console.log({ selectChoosenCategories:  categories.join('|') });
    const fetchAmenity = () => {
        dispatch(
            fetchOSMAmenities({
                amenities: categories.join('|'),
                bbox: map.getBounds(),
            })
        );
    };

    const update = (cat) => {
        const position = map.getCenter();
        const bbox = map.getBounds();
        const zoom = map.getZoom();
        if (zoom < MIN_ZOOM) {
            alert('Please increase the zoom to reduce the number of results');
        } else {
            dispatch(fetchMultiFeatures({ bbox }));
            console.log({ update: cat });
            dispatch(fetchFeatures({ position, categories: cat }));
            fetchAmenity();
        }
    };

    const buildButtons = (categories) => {
        console.log({ buildButtons: categories });
        return [
            {
                iconClassName: 'fa-bullseye',
                title: 'Center map to your location',
                action: setPosition,
            },
            {
                iconClassName: 'fa-edit',
                title: 'Select features to display',
                action: () => setModal(true),
            },
            {
                iconClassName: 'fa-redo',
                title: 'Search in this area',
                action: () => update(categories),
            },
        ];
    };
    return (
        <>
            <ButtonToolbar buttons={buildButtons(categories)} />
            <Modal show={viewModal} setOpen={setModal} />
        </>
    );
};

export default Toolbar;
