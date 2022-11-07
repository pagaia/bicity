import { useContext } from 'react';
import { Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureContext } from '../../../context/FeatureContext';
import { featureSelected, selectDatabases, selectShowFavorites } from '../../../store/featureSlice';
import { DATABASES } from '../../../utils/constants';
import buildIconMap from '../../categories/CategoryIcon';


const FeaturesLayer = (props) => {
    const { data, position } = useContext(FeatureContext);
    
    const showLayer =
        !useSelector(selectShowFavorites) ?? // if favorite is displayed then hide this layer
        useSelector(selectDatabases)?.find((db) => db.name === DATABASES.BICITY)?.selected === true;

    const filteredData = data?.features;

    const dispatch = useDispatch();

    const onClick = (e, id) => {
        dispatch(featureSelected({ local: id }));
    };

    if (!filteredData || !filteredData.length || !showLayer) {
        return null;
    }

    return (
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
                        icon={buildIconMap({
                            category: properties?.category,
                            className: 'local-icon',
                        })}>
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
    );
};

export default FeaturesLayer;
