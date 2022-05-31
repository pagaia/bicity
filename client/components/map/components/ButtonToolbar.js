import L from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';

const ButtonToolbar = ({
    title,
    map,
    position = 'topleft',
    defaultContainerClassName = 'leaflet-bar leaflet-control-fa-button custom-toolbar',
    containerClassName = '',
    buttons,
}) => {
    let helpDiv = null;

    const addButton = (container, defaultIconClassName = 'fas', iconClassName, title, action) => {
        const _button = L.DomUtil.create('a', '', container);

        _button.title = title;

        //Add events
        L.DomEvent.on(_button, 'mousedown dblclick', L.DomEvent.stopPropagation);

        _button.href = '#';

        _button.addEventListener('click', (e) => {
            e?.preventDefault();
            action();
        });

        console.debug({ defaultIconClassName });
        //Add the icon
        L.DomUtil.create('i', defaultIconClassName + ' ' + iconClassName, _button);
    };

    const createButtonControl = (buttons) => {
        const MapHelp = L.Control.extend({
            onAdd: (map) => {
                const _container = L.DomUtil.create(
                    'div',
                    defaultContainerClassName + ' ' + containerClassName
                );

                buttons.forEach((button) => {
                    const { defaultIconClassName, iconClassName, title, action } = button;
                    addButton(_container, defaultIconClassName, iconClassName, title, action);
                });
                L.DomEvent.disableClickPropagation(_container);

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
        const control = createButtonControl(buttons);
        control.addTo(map);
        return () => {
            control.remove();
        };
    });

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
