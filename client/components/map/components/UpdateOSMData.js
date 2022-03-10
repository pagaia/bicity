import React from 'react';
import { useMap } from 'react-leaflet';
import { fetchOSMAmenities } from '../../../store/osmSlice';
import LeaFletButton from './LeaFletButton';
import { useDispatch } from 'react-redux';

const UpdateOSMData = () => {
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
    return <LeaFletButton title="Update OSM" action={fetchAmenity} />;
};

export default UpdateOSMData;
