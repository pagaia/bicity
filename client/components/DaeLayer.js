import { useState } from "react";
import { useEffect } from "react";
import L from "leaflet";

const {
  LayersControl,
  Marker,
  Popup,
  useMap,
  LayerGroup,
  Circle
} = require("react-leaflet");
const center = [51.505, -0.09];

const DaeLayer = (props) => {
  const map = useMap();

  const [position, setPosition] = useState(null);
  const [daes, setDaes] = useState([]);
  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });

    map.on("locationfound", handleOnLocationFound);

    map.on("moveend", handleMoveEvent);
    return () => {
      map.off("locationfound", handleOnLocationFound);
      map.off("moveend", handleMoveEvent);
    };
  }, [map]);

  const fetchDaesNearMe = async (position) => {
    fetch(`/api/feature/nearme?lat=${position?.lat}&lng=${position?.lng}`)
      .then((res) => res.json())
      .then((data) => {
        setDaes(data);
      });
  };

  function handleOnLocationFound(e) {
    // fetch Dae near me
    const { latlng } = e;
    // map.flyTo(latlng, 15);
    setPosition(latlng);
    // const circle = L.circle(e.latlng, 500);
    // circle.addTo(map);
    fetchDaesNearMe(latlng);
  }

  function handleMoveEvent(e) {
    // fetch Dae near me
    fetchDaesNearMe(map.getCenter());
  }

  return (
    <LayersControl.Overlay name="Defibrillators">
      <LayerGroup>
        {daes.map((dae) => {
          const lat = dae.geometry.coordinates[1];
          const long = dae.geometry.coordinates[0];
          const { properties } = dae;

          return (
            <Marker position={[lat, long]} key={dae._id}>
              <Popup>
                {Object.keys(properties).map((item, idx) => {
                  return (
                    <div key={idx}>
                      <label className="fw-bold">{item}</label>:{" "}
                      <span className="txt">
                        {properties[item].toLowerCase()}
                      </span>
                    </div>
                  );
                })}
                {/* <ExternalLink
                  url={`https://www.google.com/maps/dir/?api=1&origin=${position.lat},${position.lng}&destination=${lat},${long}&travelmode=bicycling`}
                >
                  Get directions
                </ExternalLink> */}
              </Popup>
            </Marker>
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export default DaeLayer;
