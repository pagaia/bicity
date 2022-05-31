import L from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const IconButton = ({
    title,
    map,
    action,
    position = 'topleft',
    defaultContainerClassName = 'leaflet-bar leaflet-control-fa-button',
    containerClassName = '',
    defaultIconClassName = 'fas',
    iconClassName = '',
}) => {
    let helpDiv = null;

    const createButtonControl = () => {
        const MapHelp = L.Control.extend({
            onAdd: (map) => {
                const _container = L.DomUtil.create(
                    'div',
                    defaultContainerClassName + ' ' + containerClassName
                );

                const _button = L.DomUtil.create('a', '', _container);

                _button.title = title;

                //Add events
                L.DomEvent.on(_button, 'mousedown dblclick', L.DomEvent.stopPropagation);
                L.DomEvent.disableClickPropagation(_container);

                _button.href = '#';

                _button.addEventListener('click', () => {
                    console.debug(map.getCenter());
                    action();
                });

                //Add the icon
                L.DomUtil.create('i', defaultIconClassName + ' ' + iconClassName, _button);

                helpDiv = _container;
                return _container;
            },
            onRemove: (map) => {
                console.debug(`Removing leaflet button ${title}`);
                helpDiv.remove();
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

export default withMap(IconButton);
