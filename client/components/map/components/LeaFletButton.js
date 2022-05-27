import L from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const LeaFletButton = ({ title, map, action }) => {
    let helpDiv = null;

    const createButtonControl = () => {
        const MapHelp = L.Control.extend({
            onAdd: (map) => {
                const controlElementTag = 'button';
                const controlElementClass = 'my-leaflet-control leaflet-control-layers';
                const controlElement = L.DomUtil.create(controlElementTag, controlElementClass);

                // const helpDivTemp = L.DomUtil.create('button', '');
                helpDiv = controlElement;
                controlElement.innerHTML = title;

                controlElement.addEventListener('click', () => {
                    console.debug(map.getCenter());
                    action();
                });

                //a bit clueless how to add a click event listener to this button and then
                // open a popup div on the map
                return controlElement;
            },
            onRemove: (map) => {
                console.debug(`Removing leaflet button ${title}`);
                helpDiv.remove()
            },
        });
        return new MapHelp({ position: 'topright' });
    };


    useEffect(() => {
        const control = createButtonControl();
        control.addTo(map);
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
