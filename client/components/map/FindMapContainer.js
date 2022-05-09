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
            style={{ height: '20vh', width: '100%' }}>
            <TileLayer
                attribution='© <a href="https://bicity.info/copyright-policy" target="_blank">BiCity Project</a> | Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
                url={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`}
            />
            <FindPosition position={position} setPosition={setPosition} />
        </MapContainer>
    );
};

export default FindMapContainer;
