import Link from 'next/link';
import { Fragment, useContext } from 'react';
import { LayerGroup, LayersControl, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { FeatureContext } from '../../../context/FeatureContext';
// import ExternalLink from '../../ExternalLink';

const FeaturesLayer = ({ category }) => {
    const { data, position } = useContext(FeatureContext);

    const filteredData = data?.filter((feature) => feature?.properties?.category === category);

    const onClick = (e, id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    };

    return (
        <LayersControl.Overlay name={category}>
            <LayerGroup>
                <MarkerClusterGroup>
                    {filteredData.map((item) => {
                        const lat = item.geometry.coordinates[1];
                        const long = item.geometry.coordinates[0];
                        const { properties } = item;

                        return (
                            <Marker
                                position={[lat, long]}
                                key={item._id}
                                eventHandlers={{ click: (e) => onClick(e, item._id) }}>
                                <Popup>
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
