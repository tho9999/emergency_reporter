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