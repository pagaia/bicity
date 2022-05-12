import { useMap } from 'react-leaflet';
import ButtonToolbar from './ButtonToolbar';

const LocateButton = () => {
    const map = useMap();

    const setPosition = () => {
        map.locate({ setView: true, maxZoom: 16 });
    };

    const buildButtons = () => {
        return [
            {
                iconClassName: 'fa-bullseye',
                title: 'Center map to your location',
                action: setPosition,
            },
        ];
    };
    return <ButtonToolbar buttons={buildButtons()} />;
};

export default LocateButton;
