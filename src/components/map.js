import React from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import config from "../config/config";

mapboxgl.accessToken = config.token;

let Map = class Map extends React.Component {
  map;

  static propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    this.setFill();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [5, 34],
      zoom: 1.5
    });

    // Add geolocate control to the map.
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl());

    /*this.map.on('load', () => {
      this.map.addSource('countries', {
        type: 'geojson',
        data: this.props.data
      });

      this.map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries'
      }, 'country-label-lg'); // ID metches `mapbox/streets-v9`

      this.setFill();
    });
    */
  }

  setFill() {
    const { property, stops } = this.props.active;
    this.map.setPaintProperty("countries", "fill-color", {
      property,
      stops
    });
  }

  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)}
        className="absolute top right left bottom"
      />
    );
  }
};

function mapStateToProps(state) {
  return {
    data: state.data,
    active: state.active
  };
}

Map = connect(mapStateToProps)(Map);

export default Map;
