import React, { useState } from "react";
import "../mainPage.css";
import incident from "./incident.js"

function List() {
  let incidents = new Array();
function addIncident(newIncident) {
  incidents.push(newIncident);  
}

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Sorting function
  function sortIncidents(key) {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sorted = [...incidents].sort((a, b) => {
      if (key === "timeReported") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      return direction === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
    setSortConfig({ key, direction });
    setIncidents(sorted);
  }

  // Helper to show the arrow indicator
  function getSortIndicator(key) {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ▲" : " ▼";
    }
    return "";
  }

  return (
    <div>
      <h1>Incident Report</h1>

      {/* Incident List Table */}
      <table className="incident-table">
        <thead>
          <tr>
            <th onClick={() => sortIncidents("location")}>
              Location{getSortIndicator("location")}
            </th>
            <th onClick={() => sortIncidents("type")}>
              Type{getSortIndicator("type")}
            </th>
            <th onClick={() => sortIncidents("timeReported")}>
              Time Reported{getSortIndicator("timeReported")}
            </th>
            <th onClick={() => sortIncidents("status")}>
              Status{getSortIndicator("status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident, index) => (
            <tr key={index}>
              <td>{incident.location}</td>
              <td>{incident.type}</td>
              <td>{incident.timeReported}</td>
              <td>{incident.status}</td>
              <td>
              <button className="more-info-btn">MORE INFO</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;