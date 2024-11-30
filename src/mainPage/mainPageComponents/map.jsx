import "../mainPage.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup,  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Incident from "../../incident";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function Map({onMove,incidents,onMarkerClick}) {
  // State that will change based on if the marker is being hovered
  const [markerHovered, setMarkerHovered] = useState(null);

  // Helper function for when a marker is hovered
  const handleHover = (id) => {
    setMarkerHovered(id);
  }

  // Helper function for when a marker is hovered off
  const handleHoverOff = () => {
    setMarkerHovered(null);
  }

  // Function to get the icon for the marker
  const getMarkerIcon = (id) => {
    return L.icon({
      // Change the icon based on the hovered state
      iconUrl: id === markerHovered ?'/images/map-pin-yellow.png' : 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      // Control the size of icon, where the icon is anchored, and where the popup is anchored
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -44],
      shadowSize: [25, 41],
    });
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
        {incidents.map((incident, index) => (
          <Marker
            key={index}
            position={incident.location} // [latitude, longitude]
            // Gets the marker icon using id of incident
            icon={getMarkerIcon(incident.id)}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
                handleHover(incident.id);
              },
              mouseout: (e) => {
                e.target.closePopup();
                handleHoverOff();
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