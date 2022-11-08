import { Marker } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { useDispatch, useSelector } from 'react-redux';
import { featureSelected, selectDatabases, selectShowFavorites } from '../../../store/featureSlice';
import { selectAmenities } from '../../../store/osmSlice';
import { DATABASES } from '../../../utils/constants';
import buildIcon from '../../categories/CategoryIcon';

const OsmFeaturesLayer = (props) => {
    const data = useSelector(selectAmenities);
    const dispatch = useDispatch();
    const showLayer =
        !useSelector(selectShowFavorites) ?? // if favorite is displayed then hide this layer
        useSelector(selectDatabases)?.find((db) => db.name === DATABASES.OSM)?.selected === true;

    const filteredData = data ?? [];

    const onClick = (e, id) => {
        dispatch(featureSelected({ osm: id }));
    };
    if (!filteredData || !filteredData.length || !showLayer) {
        return null;
    }

    return (
        <MarkerClusterGroup>
            {filteredData.map((item) => {
                const lat = item.lat;
                const long = item.lon;
                const { tags } = item;

                return (
                    <Marker
                        position={[lat, long]}
                        key={item.id}
                        eventHandlers={{ click: (e) => onClick(e, item.id) }}
                        icon={buildIcon({
                            category: item?.tags?.amenity,
                            className: 'osm-icon',
                        })}>
                        {/* <Popup>
                                    <dl className="row">
                                        <dt className="col-sm-3">Name:</dt>
                                        <dd className="col-sm-9">{tags.amenity}</dd>

                                        <div className="col-sm-12">
                                            <ExternalLink
                                                url={`https://www.google.com/maps/dir/?api=1&origin=${position.latitude},${position.longitude}&destination=${lat},${long}&travelmode=bicycling`}>
                                                Get directions
                                            </ExternalLink>
                                        </div>
                                        {Object.keys(tags).map((item, idx) => {
                                            const value = tags[item];
                                            return (
                                                <Fragment key={idx}>
                                                    <dt className="col-sm-3">{item}</dt>
                                                    <dd className="col-sm-9">{value}</dd>
                                                </Fragment>
                                            );
                                        })}
                                    </dl>
                                </Popup> */}
                    </Marker>
                );
            })}
        </MarkerClusterGroup>
    );
};

export default OsmFeaturesLayer;
