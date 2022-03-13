import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { useMemo, useState } from 'react';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import { AMENITIES, FEATURE_CATEGORY, ROME_POSITION } from '../../utils/constants';
import FeaturesList from '../featuresList/FeaturesList';
import CenterButton from './components/CenterBotton';
import UpdateFeatureButton from './components/UpdateFeatureButton';
import UpdateOSMData from './components/UpdateOSMData';
import FeaturesLayer from './Features/FeaturesLayer';
import FeaturesManager from './Features/FeaturesManager';
import OsmFeaturesLayer from './Features/OsmFeatures';

const MainMap = (props) => {
    const onClick = (e) => {
        console.log('Control clicked, ', e);
    };

    const [map, setMap] = useState(null);

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={[ROME_POSITION.lat, ROME_POSITION.lng]}
                zoom={14}
                scrollWheelZoom
                style={{ height: '50vh', width: '100%' }}
                whenCreated={setMap}>
                <FeaturesManager>
                    <LayersControl position="topright" eventHandlers={{ click: onClick }}>
                        {Object.keys(FEATURE_CATEGORY).map((key) => {
                            return <FeaturesLayer category={FEATURE_CATEGORY[key]} key={key} />;
                        })}

                        <OsmFeaturesLayer amenity={AMENITIES.BICYCLE_PARKING} />
                        <OsmFeaturesLayer amenity={AMENITIES.BICYCLE_RENTAL} />
                        <OsmFeaturesLayer amenity={AMENITIES.BICYCLE_REPAIR_STATION} />
                    </LayersControl>
                    <UpdateOSMData />
                    <CenterButton />
                    <UpdateFeatureButton />
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
                    />
                </FeaturesManager>
            </MapContainer>
        ),
        []
    );
    return (
        <>
            {displayMap}
            {map && <FeaturesList map={map} />}
        </>
    );
};

export default MainMap;
