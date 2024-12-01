import "../mainPage.css";
import React, { useEffect, useState } from "react";
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
  // hook to listen to map events
  function MapEventsHandler() {
    const map = useMapEvents({
      moveend: () => {
        updateVisibleIncidents(map); // Update visible incidents on move
      },
    });
    // Function to update visible incidents based on map bounds
    const updateVisibleIncidents = (mapInstance) => {
      const bounds = mapInstance.getBounds(); // Get map bounds
      const visible = incidents.filter((incident) =>
        bounds.contains(incident.location) // Check if incident is within bounds
      );
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
          .map((incident, index) => (
          <Marker
            key={index}
            position={incident.location} // [latitude, longitude]
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              },
              click: (e) => {
                onMarkerClick(index,true)
                console.log("clicked marker")
              }
            }}
          >
            <Popup>
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