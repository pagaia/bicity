import Link from 'next/link';
import { useContext } from 'react';
import { LayerGroup, LayersControl, Marker, Polyline, Popup } from 'react-leaflet';
import { FeatureContext } from '../../../context/FeatureContext';

const MultiLineFeaturesLayer = ({ category }) => {
    const { data, position } = useContext(FeatureContext);

    const filteredData = data?.multiFeatures?.filter(
        (feature) => feature?.properties?.category === category
    );

    const onClick = (e, id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    };

    if (!filteredData || !filteredData.length) {
        return null;
    }
    return (
        <LayersControl.Overlay name={category} checked>
            <LayerGroup>
                {filteredData.map((item) => {
                    const { properties } = item;
                    const coordinates = item.geometry.coordinates?.[0];
                    const swappedCoordinates = coordinates.map((pos) => [pos[1], pos[0]]);
                    return (
                        <Polyline key={item._id} positions={swappedCoordinates} color={'red'}>
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
                            </Popup>
                        </Polyline>
                    );
                })}
            </LayerGroup>
        </LayersControl.Overlay>
    );
};

export default MultiLineFeaturesLayer;
