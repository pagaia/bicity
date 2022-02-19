import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import { FEATURE_CATEGORY, ROME_POSITION } from '../../utils/constants';
import CenterButton from './components/CenterBotton';
import UpdateOSMData from './components/UpdateOSMData';
import FeaturesLayer from './Features/FeaturesLayer';
import FeaturesManager from './Features/FeaturesManager';
import OsmFeaturesLayer from './Features/OsmFeatures';

const MainMap = () => {
    return (
        <MapContainer
            center={[ROME_POSITION.lat, ROME_POSITION.lng]}
            zoom={14}
            scrollWheelZoom
            style={{ height: '90vh', width: '100%' }}
            >
            <FeaturesManager>
                <LayersControl position="topright" onClick={() => console.log('Clicked')}>
                    {Object.keys(FEATURE_CATEGORY).map((key) => {
                        return <FeaturesLayer category={FEATURE_CATEGORY[key]} key={key} />;
                    })}

                    <OsmFeaturesLayer amenity="bicycle_parking" />
                    <OsmFeaturesLayer amenity="bicycle_rental" />
                    <OsmFeaturesLayer amenity="bicycle_repair_station" />
                </LayersControl>
                <UpdateOSMData />
                <CenterButton />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </FeaturesManager>
        </MapContainer>
    );
};

export default MainMap;
