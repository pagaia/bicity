import L from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';

const ButtonToolbar = ({
    title,
    map,
    position = 'topleft',
    defaultContainerClassName = 'leaflet-bar leaflet-control-fa-button',
    containerClassName = '',
    defaultIconClassName = 'fas',
    buttons,
}) => {
    let helpDiv = null;

    const addButton = (container, iconClassName, title, action) => {
        const _button = L.DomUtil.create('a', '', container);

        _button.title = title;

        //Add events
        L.DomEvent.on(_button, 'mousedown dblclick', L.DomEvent.stopPropagation);

        _button.href = '#';

        _button.addEventListener('click', () => {
            console.log(map.getCenter());
            action();
        });

        //Add the icon
        L.DomUtil.create('i', defaultIconClassName + ' ' + iconClassName, _button);
    };

    const createButtonControl = () => {
        const MapHelp = L.Control.extend({
            onAdd: (map) => {
                const _container = L.DomUtil.create(
                    'div',
                    defaultContainerClassName + ' ' + containerClassName
                );

                buttons.forEach((button) => {
                    addButton(_container, button.iconClassName, button.title, button.action);
                });
                L.DomEvent.disableClickPropagation(_container);

                helpDiv = _container;
                return _container;
            },
            onRemove: (map) => {
                console.log(`Removing leaflet button ${title}`);
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

ButtonToolbar.propTypes = {
    buttons: PropTypes.shape(
        PropTypes.arrayOf({
            iconClassName: PropTypes.string,
            title: PropTypes.string,
            action: PropTypes.func,
        })
    ),
};
function withMap(Component) {
    return function WrappedComponent(props) {
        const map = useMap();
        return <Component {...props} map={map} />;
    };
}

export default withMap(ButtonToolbar);
