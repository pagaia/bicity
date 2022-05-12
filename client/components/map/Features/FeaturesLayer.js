import L from 'leaflet';
import { useContext } from 'react';
import { LayersControl, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useDispatch } from 'react-redux';
import { FeatureContext } from '../../../context/FeatureContext';
import { featureSelected } from '../../../store/featureSlice';

const fontAwesomeIcon = L.divIcon({
    html: '<i class="fas fa-map-pin fa-2x"></i>',
    iconSize: [20, 20],
    className: 'local-icon',
});

const FeaturesLayer = (props) => {
    const { data, position } = useContext(FeatureContext);

    const filteredData = data?.features;

    const dispatch = useDispatch();

    const onClick = (e, id) => {
        dispatch(featureSelected({ local: id }));
    };
    if (!filteredData || !filteredData.length) {
        return null;
    }

    return (
        <LayersControl.Overlay name="BiCity DB" checked={filteredData.length}>
            <MarkerClusterGroup>
                {filteredData.map((item) => {
                    const lat = item.geometry.coordinates[1];
                    const long = item.geometry.coordinates[0];
                    const { properties } = item;

                    return (
                        <Marker
                            position={[lat, long]}
                            key={item._id}
                            eventHandlers={{ click: (e) => onClick(e, item._id) }}
                            icon={fontAwesomeIcon}>
                            {/* <Popup>
                                    <div>
                                        <label className="fw-bold">Name:</label>
                                        <span className="txt">{item?.properties?.name}</span>
                                        {Object.keys(properties).map((item, idx) => {
                                            if (item === 'name') return null;
                                            const value = properties[item];
                                            return (
                                                <div key={idx}>
                                                    <label className="fw-bold">{item}</label>:{' '}
                                                    <span className="txt">{value}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div>
                                        <Link href={`/features/${item._id}`}>
                                            <a>View details</a>
                                        </Link>
                                    </div>
                                </Popup> */}
                        </Marker>
                    );
                })}
            </MarkerClusterGroup>
        </LayersControl.Overlay>
    );
};

export default FeaturesLayer;
