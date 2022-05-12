import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureContext } from '../../../context/FeatureContext';
import { selectChoosenCategories } from '../../../store/categorySlice';
import {
    fetchFeatures,
    fetchFeaturesByBbox,
    fetchMultiFeatures,
    selectFeatures,
    selectMultiFeatures,
} from '../../../store/featureSlice';
import { fetchOSMAmenities } from '../../../store/osmSlice';
import { MIN_ZOOM } from '../../../utils/constants';

const FeaturesManager = ({ children }) => {
    const map = useMap();

    const [position, setPosition] = useState(null);
    const [prevCenter, setPrevCenter] = useState(null);

    const dispatch = useDispatch();
    const features = useSelector(selectFeatures);
    const multiFeatures = useSelector(selectMultiFeatures);
    const categories = useSelector(selectChoosenCategories).map((cat) => cat.name);

    useEffect(() => {
        return () => console.log('Unmounted FeaturesManager');
    }, []);

    useEffect(() => {
        map.locate({ setView: true, maxZoom: 16 });
        // map.locate({  maxZoom: 16 });

        map.on('locationfound', handleOnLocationFound);
        map.on('locationerror', handleOnLocationError);
        // map.on('movestart', handleMoveEventStart);
        // map.on('moveend', handleMoveEventEnd);

        return () => {
            map.off('locationfound', handleOnLocationFound);
            map.off('locationerror', handleOnLocationError);
            // map.off('movestart', handleMoveEventStart);
            // map.off('moveend', handleMoveEventEnd);
        };
    }, [map]);

    function handleOnLocationFound(e) {
        console.log('handleOnLocationFound ', e)
        const { latlng } = e;
        const bbox = map.getBounds();
        const zoom = map.getZoom();

        // map.flyTo(latlng, 15);
        if (latlng) {
            console.log({ latlng });
            setPosition(latlng);
            // const circle = L.marker(latlng, 20);
            // circle.addTo(map);
            // fetchFeatures(latlng);
            console.log({ position });
            if (zoom < MIN_ZOOM) {
                alert('Please increase the zoom to reduce the number of results');
            } else {
                dispatch(fetchFeaturesByBbox({ bbox, categories }));
                const amenities = categories?.join('|');
                // dispatch(fetchFeatures({ position: latlng }));
                dispatch(fetchMultiFeatures({ bbox }));
                dispatch(
                    fetchOSMAmenities({
                        amenities,
                        bbox,
                    })
                );
            }
        } else {
            console.error({ latlng: 'NOT DEFINED' });
        }
    }

    function handleOnLocationError(e) {
        console.log({ handleOnLocationError: e });
    }

  

    return (
        <FeatureContext.Provider value={{ data: { features, multiFeatures }, position }}>
            {children}
        </FeatureContext.Provider>
    );
};

export default FeaturesManager;
