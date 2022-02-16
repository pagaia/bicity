import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { FeatureContext } from '../../../context/FeatureContext';

const FeaturesManager = ({ children }) => {
    const map = useMap();

    const [position, setPosition] = useState(null);
    const [data, setData] = useState([]);
    const [prevCenter, setPrevCenter] = useState(null);

    useEffect(() => {
        map.locate({ setView: true, maxZoom: 16 });
        // map.locate({  maxZoom: 16 });

        map.on('locationfound', handleOnLocationFound);
        map.on('locationerror', handleOnLocationError);
        map.on('movestart', handleMoveEventStart);
        map.on('moveend', handleMoveEventEnd);

        return () => {
            map.off('locationfound', handleOnLocationFound);
            map.off('locationerror', handleOnLocationError);
            map.off('movestart', handleMoveEventStart);
            map.off('moveend', handleMoveEventEnd);
        };
    }, [map]);

    const fetchFeatures = async (position) => {
        const response = await axios(
            `/api/feature/nearme?lat=${position?.lat}&lng=${position?.lng}`
        );
        const { data } = response;
        setData(data);
    };

    function handleOnLocationFound(e) {
        // fetch Dae near me
        const { latlng } = e;
        // map.flyTo(latlng, 15);
        if (latlng) {
            console.log({ latlng });
            setPosition(latlng);
            // const circle = L.circle(e.latlng, 500);
            // circle.addTo(map);
            fetchFeatures(latlng);
        } else {
            console.error({ latlng: 'NOT DEFINED' });
        }
    }

    function handleOnLocationError(e) {
        console.log({ e });
    }

    function handleMoveEventEnd(e) {
        const distance = prevCenter?.distanceTo(map.getCenter()).toFixed(0);
        if (!prevCenter || distance > 1000) {
            console.log({ prevCenter, distance });
            fetchFeatures(map.getCenter());
        }
    }

    function handleMoveEventStart(e) {
        console.log({ mapCenterStart: map.getCenter() });
        setPrevCenter(map.getCenter());
    }

    return <FeatureContext.Provider value={{ data, position }}>{children}</FeatureContext.Provider>;
};

export default FeaturesManager;
