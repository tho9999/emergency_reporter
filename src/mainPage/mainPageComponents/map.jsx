import "../mainPage.css";
import React, { useEffect } from "react";
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