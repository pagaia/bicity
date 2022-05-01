import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const FindPosition = ({ position, setPosition }) => {
    const markerRef = useRef(null);

    const map = useMap();
    const { lat, lng } = position;
    // // const [foundPosition, setPosition] =
    // // locate on monting
    // useEffect(() => {
    //   // map.locate();
    //   map.on("dragend", handleOnLocationFound);
    //   return () => {
    //     map.off("dragend", handleOnLocationFound);
    //   };
    // }, []);

    // flyto position when located
    function handleOnLocationFound(e) {
        // const { latlng } = e;
        // map.flyTo(latlng, 15);
        console.log({ e });
    }

    // fly to position when position changes
    useEffect(() => {
        if (lat && lng) {
            console.log({ position });
            map?.setView({ lat, lng }, 15);

        }
        return () => {
            console.log('UnMounting ');
        };
    }, [lat, lng]);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
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
            ref={markerRef}
        >
            <Popup>Hey ! you found me</Popup>
        </Marker>
    );
};

export default React.memo(FindPosition);
