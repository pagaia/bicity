import React from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { fetchFeatures, fetchMultiFeatures } from '../../../store/featureSlice';
import { fetchOSMAmenities } from '../../../store/osmSlice';
import IconButton from './IconButton';

const UpdateSearchButton = () => {
    const map = useMap();
    const dispatch = useDispatch();

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
        dispatch(fetchMultiFeatures({ bbox }));
        dispatch(fetchFeatures({ position }));
        fetchAmenity();
    };
    return <IconButton iconClassName="fa-redo" title="Search in this area" action={update} />;
};

export default UpdateSearchButton;
