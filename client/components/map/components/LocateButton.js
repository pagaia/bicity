import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { showError } from '../../../store/errorSlice';
import { ERROR_MESSAGE } from '../../../utils/constants';
import ButtonToolbar from './ButtonToolbar';

const LocateButton = ({ className, updatePosition }) => {
    const map = useMap();
    const dispatch = useDispatch();

    function handleOnLocationFound(e) {
        const { latlng } = e;
        updatePosition(latlng);
    }

    function handleOnLocationError(e) {
        console.debug({ handleOnLocationError: e });
        dispatch(showError({ message: ERROR_MESSAGE.POSITION_ERROR }));
    }

    const setPosition = () => {
        map.locate({ setView: true, maxZoom: 16 });
        map.on('locationfound', handleOnLocationFound);
        map.on('locationerror', handleOnLocationError);
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
