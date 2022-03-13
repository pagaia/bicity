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
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
            />
            <FindPosition position={position} setPosition={setPosition} />
        </MapContainer>
    );
};

export default FindMapContainer;
