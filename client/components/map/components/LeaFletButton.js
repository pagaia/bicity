import L from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const LeaFletButton = ({ title, map, action }) => {
    let helpDiv = null;

    const createButtonControl = () => {
        const MapHelp = L.Control.extend({
            onAdd: (map) => {
                const helpDivTemp = L.DomUtil.create('button', '');
                helpDiv = helpDivTemp;
                helpDiv.innerHTML = title;

                helpDiv.addEventListener('click', () => {
                    console.log(map.getCenter());
                    action();
                });

                //a bit clueless how to add a click event listener to this button and then
                // open a popup div on the map
                return helpDiv;
            },
        });
        return new MapHelp({ position: 'topright' });
    };

    useEffect(() => {
        const control = createButtonControl();
        control.addTo(map);
        return helpDiv.remove;
    }, []);

    return null;
};

function withMap(Component) {
    return function WrappedComponent(props) {
        const map = useMap();
        return <Component {...props} map={map} />;
    };
}

export default withMap(LeaFletButton);
