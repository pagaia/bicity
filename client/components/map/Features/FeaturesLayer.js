import Link from 'next/link';
import { useContext } from 'react';
import { LayerGroup, LayersControl, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { FeatureContext } from '../../../context/FeatureContext';
// import ExternalLink from '../../ExternalLink';

const FeaturesLayer = ({ category }) => {
    const { data, position } = useContext(FeatureContext);

    const filteredData = data?.filter((feature) => feature?.properties?.category === category);

    return (
        <LayersControl.Overlay name={category}>
            <LayerGroup>
                <MarkerClusterGroup>
                    {filteredData.map((item) => {
                        const lat = item.geometry.coordinates[1];
                        const long = item.geometry.coordinates[0];
                        const { properties } = item;

                        return (
                            <Marker position={[lat, long]} key={item._id}>
                                <Popup>
                                    <div >
                                        <label className="fw-bold">Name</label>:{' '}
                                        <span className="txt">{item?.properties?.name}</span>
                                    </div>
                                    {/* <dl className="row">
                                        <dt className="col-sm-3">Name</dt>
                                        <dd className="col-sm-9">{item?.properties?.name}</dd>

                                        <div className="col-sm-12">
                                            <ExternalLink
                                                url={`https://www.google.com/maps/dir/?api=1&origin=${position.latitude},${position.longitude}&destination=${lat},${long}&travelmode=bicycling`}>
                                                Get directions
                                            </ExternalLink>
                                        </div>
                                    </dl> */}
                                    {/* {Object.keys(properties).map((item, idx) => {
                                        const value =
                                            typeof properties[item] === 'string'
                                                ? properties[item].toLowerCase()
                                                : properties[item];
                                        return (
                                            <div key={idx}>
                                                <label className="fw-bold">{item}</label>:{' '}
                                                <span className="txt">{value}</span>
                                            </div>
                                        );
                                    })} */}
                                    <div>
                                        <Link href={`/features/${item._id}`}>
                                            <a>View details</a>
                                        </Link>
                                    </div>
                                    {/* <div>
                                        <ExternalLink
                                            url={`https://www.google.com/maps/dir/?api=1&origin=${position.lat},${position.lng}&destination=${lat},${long}&travelmode=bicycling`}>
                                            Get directions
                                        </ExternalLink>
                                    </div> */}
                                </Popup>
                            </Marker>
                        );
                    })}
                </MarkerClusterGroup>
            </LayerGroup>
        </LayersControl.Overlay>
    );
};

export default FeaturesLayer;
