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
            console.log({ location });
            const [lng, lat] = location?.geometry?.coordinates;
            console.log({ map, lat, lng });
            if (marker) {
                console.log({ marker });
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
            console.log({ suggestions });
        });
    }, []);
    return <div id="autocomplete" className="autocomplete-container"></div>;
};

export default GeoCoding;