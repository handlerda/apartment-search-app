import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css";
function Map({ location }) {
  console.log(location);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(15);
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGFuZGxlcmRhMSIsImEiOiJja293Y2x1c20wNDZrMnZvMmtkaXo5b25hIn0.uQKlsrgTaBTzon9eZslcFw";
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location.lng, location.lat],
      zoom: zoom,
    });
  });
  return (
    mapContainer && (
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    )
  );
}

export default Map;
