import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useMemo, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

const FindPosition = ({ position, setPosition }) => {
    const markerRef = useRef(null);

    const map = useMap();
    const { lat, lng } = position;

    // fly to position when position changes
    useEffect(() => {
        if (lat && lng) {
            map?.setView({ lat, lng }, 15);
        }
        return () => {
            console.debug('UnMounting ');
        };
    }, [lat, lng]);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const pos = marker.getLatLng();
                    setPosition(pos);
                }
            },
        }),
        []
    );

    return (
        <Marker
            position={[position.lat, position.lng]}
            draggable={true}
            animate={true}
            eventHandlers={eventHandlers}
            ref={markerRef}>
            <Popup>Hey ! you found me</Popup>
        </Marker>
    );
};

export default React.memo(FindPosition);
