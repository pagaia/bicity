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

const ParkingVelo = (props) => {
  const map = useMap();

  const [position, setPosition] = useState(null);
  const [veloParking, setVeloParking] = useState([]);

  useEffect(() => {
    fetchVeloBxl();
  }, []);

  const fetchVeloBxl = async () => {
    fetch("/collecto-stops.json")
      .then((res) => res.json())
      .then((data) => {
        setVeloParking(data);
      });
  };

  return (
    <LayersControl.Overlay name="Parking velo BxL">
      <LayerGroup>
        {veloParking?.features?.map((item, idx) => {
          // if(idx> 10){
          //   return null
          // }
          console.log({item})
          const lat = item.geometry.coordinates[1];
          const long = item.geometry.coordinates[0];
          const { properties } = item;

          return (
            <Marker position={[lat, long]} key={item.id}>
              <Popup>
                {Object.keys(properties).map((item, idx) => {
                  return (
                    <div key={idx}>
                      <label className="fw-bold">{item}</label>:{" "}
                      <span className="txt">
                        {typeof properties[item] === "string"
                          ? properties[item].toLowerCase()
                          : properties[item]}
                      </span>
                    </div>
                  );
                })}
               
              </Popup>
            </Marker>
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};

export default ParkingVelo;
