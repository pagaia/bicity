import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { ROME_POSITION } from '../../utils/constants';
import FindPosition from './FindPosition';

const FindMapContainer = ({ position = ROME_POSITION, setPosition }) => {
    return (
        <MapContainer
            center={[position.lat, position.lng]}
            zoom={14}
            scrollWheelZoom
            style={{ height: '20vh', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FindPosition position={position} setPosition={setPosition} />
        </MapContainer>
    );
};

export default FindMapContainer;
