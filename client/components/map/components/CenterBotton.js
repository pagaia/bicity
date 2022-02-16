import React from 'react';
import { useMap } from 'react-leaflet';
import LeaFletButton from './LeaFletButton';

const CenterButton = () => {
    const map = useMap();
    const setPosition = () => {
        map.locate({ setView: true, maxZoom: 16 });
    };
    return <LeaFletButton title="center" action={setPosition} />;
};

export default CenterButton;
