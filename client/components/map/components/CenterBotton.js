import React from 'react';
import { useMap } from 'react-leaflet';
import IconButton from './IconButton';

const CenterButton = () => {
    const map = useMap();
    const setPosition = () => {
        map.locate({ setView: true, maxZoom: 16 });
    };
    return (
        <IconButton
            iconClassName="fa-bullseye"
            title="Center map to your location"
            action={setPosition}
        />
    );
};

export default CenterButton;
