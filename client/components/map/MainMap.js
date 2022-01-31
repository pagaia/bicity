import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import { FEATURE_CATEGORY, ROME_POSITION } from '../../utils/constants';
import FeaturesLayer from './Features/FeaturesLayer';
import FeaturesManager from './Features/FeaturesManager';

const MainMap = () => {
    return (
        <MapContainer
            center={[ROME_POSITION.lat, ROME_POSITION.lng]}
            zoom={14}
            scrollWheelZoom
            style={{ height: '85vh', width: '100%' }}>
            <FeaturesManager>
                <LayersControl position="topright">
                    {Object.keys(FEATURE_CATEGORY).map((key) => {
                        return <FeaturesLayer category={FEATURE_CATEGORY[key]} key={key} />;
                    })}
                </LayersControl>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </FeaturesManager>
        </MapContainer>
    );
};

export default MainMap;
