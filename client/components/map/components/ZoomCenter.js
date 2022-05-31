import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

const ZoomCenter = (props) => {
    const map = useMap();

    const [position, setPosition] = useState(null);
    const [zoom, setZoom] = useState(null);
    const handleMoveEventEnd = () => {
        setPosition(map.getCenter());
    };
    const handleZoomEventEnd = () => {
        setZoom(map.getZoom());
    };

    useEffect(() => {
        map.on('moveend', handleMoveEventEnd);
        map.on('zoomend', handleZoomEventEnd);
    }, [map]);

    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <div className="leaflet-bottom leaflet-left">
            <div className="bg-light ms-5">
                {position?.lat.toFixed(4)}/{position?.lng?.toFixed(4)}/{zoom}
            </div>
        </div>
    );
};

export default ZoomCenter;
