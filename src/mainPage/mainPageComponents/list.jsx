import React, { useState } from "react";
import "../mainPage.css";

function List({incidents}) {

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Sorting function
  function sortIncidents(key) {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    [...incidents].sort((a, b) => {
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
              <td>{incident.emergency_info}</td>
              <td>{incident.time}</td>
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