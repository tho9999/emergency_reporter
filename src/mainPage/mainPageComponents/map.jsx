import "../mainPage.css";
import React, { useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function Map({onMove,incidents,onMarkerClick}) {
  const [zoomLevel, setZoomLevel] = useState(13);
  const maxZoom = 11.5;
    // hook to listen to map events
  function MapEventsHandler() {
    const map = useMapEvents({
      zoomend: () => {
        // Make all invisible if current zoom <= maxZoom
        // Small zoom is out, big zoom is in
        updateVisibleIncidents(map);
      },
      moveend: () => {
        updateVisibleIncidents(map); // Update visible incidents on move
      },
    });
    // Function to update visible incidents based on map bounds
    const updateVisibleIncidents = (mapInstance) => {
      const bounds = mapInstance.getBounds(); // Get map bounds
      const currentZoom = map.getZoom();
      const visible = incidents.filter((incident) =>
        bounds.contains(incident.location)
        && currentZoom >= maxZoom // Check if incident is within bounds
      );
      setZoomLevel(currentZoom);
      onMove(visible); // Pass visible incidents to main page
    };
    return null;
  }
  return (
    <div className="map-container">
      <MapContainer
        center={[49.27220213143677, -123.10171962066065]} // Default center
        zoom={13}
        style={{ height: "500px", width: "100%" }} // Map size
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapEventsHandler />
        {incidents
          .filter(() => zoomLevel >= maxZoom)
          .map((incident, index) => (
          <Marker
            key={index}
            position={incident.location} // [latitude, longitude]
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
                e.target._icon.src = "/images/map-pin-yellow.png";
              },
              mouseout: (e) => {
                e.target.closePopup();
                e.target._icon.src = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
              },
              click: (e) => {
                onMarkerClick(index,true)
                console.log("clicked marker")
              }
            }}
          >
            <Popup>
              <b>{incident.getAddress()} </b>
              <br />
              <b>Emergency Info:</b> {incident.getEmergencyInfo()}
              <br />
              <b>Status:</b> {incident.getStatus()}
              <br />
              <b>Time:</b> {incident.getTime()}
            </Popup>
          </Marker>
          
            )
          )
        }
      </MapContainer>
    </div>
  );
}

export default Map;