import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import { useEffect } from 'react';

let marker = null;

const GeoCoding = ({ map }) => {
    useEffect(() => {
        const autocomplete = new GeocoderAutocomplete(
            document.getElementById('autocomplete'),
            process.env.NEXT_PUBLIC_GEOAPIFY_KEY,
            {
                debounceDelay: 1000,
            }
        );

        autocomplete.on('select', (location) => {
            // check selected location here
            if (!location) {
                return;
            }
            let lng, lat;
            switch (location?.geometry?.type) {
                case 'Polygon':
                case 'MultiPoint':
                    [lng, lat] = location?.geometry?.coordinates?.[0]?.[0];
                    break;
                case 'MultiPolygon':
                case 'MultiLineString':
                    [lng, lat] = location?.geometry?.coordinates?.[0]?.[0]?.[0];
                    break;
                case 'LineString':
                    [lng, lat] = location?.geometry?.coordinates?.[0];
                    break;
                case 'Point':
                case 'Position':
                    [lng, lat] = location?.geometry?.coordinates;
                    break;
            }
            console.debug({ lng, lat });
            if (marker) {
                console.debug({ marker });
                var newLatLng = new L.LatLng(lat, lng);
                marker.setLatLng(newLatLng);
            } else {
                marker = L.marker([lat, lng]);
                marker.addTo(map);
            }

            map?.setView({ lat, lng }, 15);
        });

        autocomplete.on('suggestions', (suggestions) => {
            // process suggestions here
            console.debug({ suggestions });
        });
    }, []);
    return <div id="autocomplete" className="autocomplete-container"></div>;
};

export default GeoCoding;
