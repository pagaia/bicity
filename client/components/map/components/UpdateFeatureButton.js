import React from 'react';
import { useMap } from 'react-leaflet';
import LeaFletButton from './LeaFletButton';
import { useDispatch } from 'react-redux';
import { fetchFeatures } from '../../../store/featureSlice';

const UpdateFeatureButton = () => {
    const map = useMap();
    const dispatch = useDispatch();

    const update = () => {
        const position = map.getCenter();

        dispatch(fetchFeatures({ position }));
    };

    return <LeaFletButton title="Update Search" action={update} />;
};

export default UpdateFeatureButton;
