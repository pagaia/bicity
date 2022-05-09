import { LayerGroup, LayersControl, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { selectAmenities } from '../../../store/osmSlice';
import { useDispatch, useSelector } from 'react-redux';
import { featureSelected } from '../../../store/featureSlice';

const fontAwesomeIcon = L.divIcon({
    html: '<i class="fas fa-map-pin fa-2x"></i>',
    iconSize: [20, 20],
    className: 'osm-icon',
});

const OsmFeaturesLayer = (props) => {
    const data = useSelector(selectAmenities);
    const dispatch = useDispatch();

    const filteredData = data ?? [];

    const onClick = (e, id) => {
        dispatch(featureSelected({ osm: id }));
    };
    return (
        <LayersControl.Overlay name="OSM amenities">
            <LayerGroup>
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
                                icon={fontAwesomeIcon}>
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
            </LayerGroup>
        </LayersControl.Overlay>
    );
};

export default OsmFeaturesLayer;
