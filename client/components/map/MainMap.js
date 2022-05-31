import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { useMemo, useState } from 'react';
import { MapContainer, ScaleControl, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowModal, showModal } from '../../store/categorySlice';
import { isMobile } from '../../utils/common.functions';
import { ROME_POSITION } from '../../utils/constants';
import CategorySelection from '../categories/CategorySelection';
import ModalFeature from '../features/ModalFeature';
import GeoCoding from './components/GeoCoding';
import Toolbar from './components/ToolBar';
import ZoomCenter from './components/ZoomCenter';
import FavoritesLayer from './Features/FavoritesLayer';
import FeaturesLayer from './Features/FeaturesLayer';
import FeaturesManager from './Features/FeaturesManager';
import OsmFeaturesLayer from './Features/OsmFeatures';
import MyPosition from './icons/MyPositionIcon';

const MainMap = (props) => {
    const [map, setMap] = useState(null);
    const dispatch = useDispatch();
    const viewModal = useSelector(selectShowModal);

    const setModal = (toggle) => {
        dispatch(showModal(toggle));
    };

    const height = isMobile() ? 'calc(100vh - 110px)' : 'calc(100vh - 50px)';

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={[ROME_POSITION.lat, ROME_POSITION.lng]}
                zoom={14}
                maxZoom={18}
                scrollWheelZoom
                style={{ height, width: '100%' }}
                whenCreated={setMap}
                id="mapContainer">
                <ScaleControl position="bottomleft" />
                <FeaturesManager>
                    <MyPosition />
                    <FeaturesLayer />
                    <FavoritesLayer />
                    {/* {Object.keys(MULTI_FEATURE_CATEGORY).map((key) => {
                            return (
                                <MultiLineFeaturesLayer
                                    category={MULTI_FEATURE_CATEGORY[key]}
                                    key={key}
                                />
                            );
                        })} */}
                    <OsmFeaturesLayer />
                    <ZoomCenter />
                    <Toolbar />
                    <TileLayer
                        attribution='© <a href="https://bicity.info/copyright-policy" target="_blank">BiCity Project</a> | Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
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
            <ModalFeature />
        </>
    );
};

export default MainMap;
