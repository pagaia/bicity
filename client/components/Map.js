import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import DaeLayer from "./DaeLayer";
import ParkingVelo from "./ParkingVelo";

const Map = () => {
  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom
      style={{ height: "85vh", width: "100%" }}
    >
      <LayersControl position="topright">
        <DaeLayer />
        {/* <ParkingVelo/> */}
      </LayersControl>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[40.8054, -74.0241]} draggable={true} animate={true}>
        <Popup>Hey ! you found me</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
