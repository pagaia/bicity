import { useState } from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
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

    const fetchAmenity = () => {
        dispatch(
            fetchOSMAmenities({
                amenities: 'bicycle_rental|bicycle_parking|bicycle_repair_station',
                bbox: map.getBounds(),
            })
        );
    };

    const update = () => {
        const position = map.getCenter();
        const bbox = map.getBounds();
        const zoom = map.getZoom();
        if (zoom < MIN_ZOOM) {
            alert('Please increase the zoom to reduce the number of results');
        } else {
            dispatch(fetchMultiFeatures({ bbox }));
            dispatch(fetchFeatures({ position }));
            fetchAmenity();
        }
    };
    const buttons = [
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
            action: update,
        },
    ];

    return (
        <>
            <ButtonToolbar buttons={buttons} />
            <Modal show={viewModal} setOpen={setModal} />
        </>
    );
};

export default Toolbar;
