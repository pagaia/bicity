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
import { updateGeoLocation } from '../../../store/userSlice';
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

        map.on('locationfound', handleOnLocationFound);
        map.on('locationerror', handleOnLocationError);

        return () => {
            map.off('locationfound', handleOnLocationFound);
            map.off('locationerror', handleOnLocationError);
        };
    }, [map]);

    function handleOnLocationFound(e) {
        console.log('handleOnLocationFound ', e);
        const { latlng } = e;
        const bbox = map.getBounds();
        const zoom = map.getZoom();

        if (latlng) {
            const { _northEast, _southWest } = bbox;
            const { lat: nelat, lng: nelng } = _northEast;
            const { lat: swlat, lng: swlng } = _southWest;
            const bboxSerialized = { nelat, nelng, swlat, swlng };
            const serializedPosition = { lat: latlng.lat, lng: latlng.lng };
          
            dispatch(
                updateGeoLocation({
                    position: serializedPosition,
                    bbox: bboxSerialized,
                    zoom,
                })
            );

            setPosition(latlng);

            if (zoom < MIN_ZOOM) {
                alert('Please increase the zoom to reduce the number of results');
            } else {
                dispatch(fetchFeaturesByBbox({ bbox, categories }));
                const amenities = categories?.join('|');

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
