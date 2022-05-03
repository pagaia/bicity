import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { useMemo, useState } from 'react';
import { LayersControl, MapContainer, ScaleControl, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowModal, showModal } from '../../store/categorySlice';
import {
    MULTI_FEATURE_CATEGORY,
    ROME_POSITION
} from '../../utils/constants';
import FeaturesList from '../features/FeaturesList';
import CategorySelection from '../categories/CategorySelection';
import GeoCoding from './components/GeoCoding';
import Toolbar from './components/ToolBar';
import ZoomCenter from './components/ZoomCenter';
import FeaturesLayer from './Features/FeaturesLayer';
import FeaturesManager from './Features/FeaturesManager';
import MultiLineFeaturesLayer from './Features/MultiLineFeaturesLayer';
import OsmFeaturesLayer from './Features/OsmFeatures';
import ModalFeature from '../features/ModalFeature';

const MainMap = (props) => {
    const onClick = (e) => {
        console.log('Control clicked, ', e);
    };

    const [map, setMap] = useState(null);
    const dispatch = useDispatch();
    const viewModal = useSelector(selectShowModal);

    const setModal = (toggle) => {
        dispatch(showModal(toggle));
    };

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={[ROME_POSITION.lat, ROME_POSITION.lng]}
                zoom={14}
                scrollWheelZoom
                style={{ height: '93vh', width: '100%' }}
                whenCreated={setMap}>
                <ScaleControl position="bottomleft" />
                <FeaturesManager>
                    <LayersControl position="topright" eventHandlers={{ click: onClick }}>
                        <FeaturesLayer />
                        {Object.keys(MULTI_FEATURE_CATEGORY).map((key) => {
                            return (
                                <MultiLineFeaturesLayer
                                    category={MULTI_FEATURE_CATEGORY[key]}
                                    key={key}
                                />
                            );
                        })}
                        <OsmFeaturesLayer />
                    </LayersControl>
                    <ZoomCenter />
                    <Toolbar />
                    <TileLayer
                        attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
                        url={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`}
                    />
                </FeaturesManager>
            </MapContainer>
        ),
        []
    );
    return (
        <>
            {map && <GeoCoding map={map} />}
            {displayMap}
            <CategorySelection show={viewModal} setOpen={setModal} />
            {/* {map && <FeaturesList map={map} />} */}
            <ModalFeature/>
        </>
    );
};

export default MainMap;
