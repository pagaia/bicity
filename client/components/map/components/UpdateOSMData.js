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
                amenity: 'bicycle_parking',
                bbox: map.getBounds(),
            })
        );

        setTimeout(() => {
            dispatch(
                fetchOSMAmenities({
                    amenity: 'bicycle_rental',
                    bbox: map.getBounds(),
                })
            );
        }, 2000);

        setTimeout(() => {
            dispatch(
                fetchOSMAmenities({
                    amenity: 'bicycle_repair_station',
                    bbox: map.getBounds(),
                })
            );
        }, 4000);
    };
    return <LeaFletButton title="Update OSM" action={fetchAmenity} />;
};

export default UpdateOSMData;
