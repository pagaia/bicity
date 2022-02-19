import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureContext } from '../../../context/FeatureContext';
import { fetchFeatures, selectFeatures } from '../../../store/featureSlice';

const FeaturesManager = ({ children }) => {
    const map = useMap();ª

    const [position, setPosition] = useState(null);
    const [prevCenter, setPrevCenter] = useState(null);

    const dispatch = useDispatch();
    const features = useSelector(selectFeatures);

    useEffect(() => {
        return () => console.log('Unmounted FeaturesManager');
    }, []);

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


    function handleOnLocationFound(e) {
        const { latlng } = e;
        // map.flyTo(latlng, 15);
        if (latlng) {
            console.log({ latlng });
            setPosition(latlng);
            // const circle = L.circle(e.latlng, 500);
            // circle.addTo(map);
            // fetchFeatures(latlng);
            console.log({ position });
            dispatch(fetchFeatures({ position: latlng }));
        } else {
            console.error({ latlng: 'NOT DEFINED' });
        }
    }

    function handleOnLocationError(e) {
        console.log({ handleOnLocationError: e });
    }

    function handleMoveEventEnd(e) {
        const pos = map.getCenter();
        const distance = prevCenter?.distanceTo?.(pos)?.toFixed(0);
        console.log({ prevCenter, distance, pos });
        if (pos && (!prevCenter || distance > 1000)) {
            console.log({ prevCenter, distance });
            dispatch(fetchFeatures({ position: pos }));

        }
    }

    function handleMoveEventStart(e) {
        console.log({ mapCenterStart: map.getCenter() });
        setPrevCenter(map.getCenter());
    }

    return (
        <FeatureContext.Provider value={{ data: features, position }}>
            {children}
        </FeatureContext.Provider>
    );
};

export default FeaturesManager;
