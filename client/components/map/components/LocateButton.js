import { useMap } from 'react-leaflet';
import ButtonToolbar from './ButtonToolbar';

const LocateButton = ({ className }) => {
    const map = useMap();

    const setPosition = () => {
        map.locate({ setView: true, maxZoom: 16 });
    };

    const buildButtons = () => {
        return [
            {
                iconClassName: 'fa-crosshairs',
                title: 'Center map to your location',
                action: setPosition,
            },
        ];
    };
    return <ButtonToolbar buttons={buildButtons()} defaultContainerClassName={className} />;
};

export default LocateButton;
