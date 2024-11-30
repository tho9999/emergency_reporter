import React, { useState } from "react";
import "../mainPage.css";

function List({ incidents, onMoreInfoClick}) {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Sorting function
  function sortIncidents(key) {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

      incidents.sort((a, b) => {
      const aValue =
        key === "time" ? new Date(a.getTime()) : a[`get${capitalize(key)}`]?.();
      const bValue =
        key === "time" ? new Date(b.getTime()) : b[`get${capitalize(key)}`]?.();

      if (!aValue || !bValue) return 0; // Handle undefined values gracefully

      if (key === "time") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return direction === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });

    setSortConfig({ key, direction });

  }

  // Capitalize helper function
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Helper to show the arrow indicator
  function getSortIndicator(key) {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ▲" : " ▼";
    }
    return "";
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Reported Incidents</h1>

      
      <table className="incidentTable" style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th onClick={() => sortIncidents("location")}>
              Location{getSortIndicator("location")}
            </th>
            <th onClick={() => sortIncidents("emergencyInfo")}>
              Type{getSortIndicator("emergencyInfo")}
            </th>
            <th onClick={() => sortIncidents("time")}>
              Time Reported{getSortIndicator("time")}
            </th>
            <th onClick={() => sortIncidents("status")}>
              Status{getSortIndicator("status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident, index) => (
            <tr key={index}>
              <td>{incident.getLocation()}</td>
              <td>{incident.getEmergencyInfo()}</td>
              <td>{incident.getTime()}</td>
              <td>{incident.getStatus()}</td>
              <td>
              <button className="more-info-btn" onClick={() => onMoreInfoClick(index)}>MORE INFO</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;