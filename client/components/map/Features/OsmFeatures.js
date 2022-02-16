import { Fragment } from 'react';
import { LayerGroup, LayersControl, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useSelector } from 'react-redux';
import { selectAmenity } from '../../../store/osmSlice';

const OsmFeaturesLayer = ({ amenity }) => {
    const data = useSelector(selectAmenity(amenity));

    const filteredData = data?.elements ?? [];

    return (
        <LayersControl.Overlay name={`OSM_${amenity}`}>
            <LayerGroup>
                <MarkerClusterGroup>
                    {filteredData.map((item) => {
                        const lat = item.lat;
                        const long = item.lon;
                        const { tags } = item;

                        return (
                            <Marker position={[lat, long]} key={item._id}>
                                <Popup>
                                    <dl className="row">
                                        <dt className="col-sm-3">Name:</dt>
                                        <dd className="col-sm-9">{tags.amenity}</dd>

                                        {/* <div className="col-sm-12">
                                            <ExternalLink
                                                url={`https://www.google.com/maps/dir/?api=1&origin=${position.latitude},${position.longitude}&destination=${lat},${long}&travelmode=bicycling`}>
                                                Get directions
                                            </ExternalLink>
                                        </div> */}
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
                                </Popup>
                            </Marker>
                        );
                    })}
                </MarkerClusterGroup>
            </LayerGroup>
        </LayersControl.Overlay>
    );
};

export default OsmFeaturesLayer;
