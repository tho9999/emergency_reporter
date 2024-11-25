import React from "react";
import "../mainPage.css";

// Sample incident data (replace with actual incident data or class)
const incidents = [
  {
    location: "Metrotown",
    type: "shooting",
    timeReported: "2023-11-01 (5:30pm)",
    status: "RESOLVED",
  },
  {
    location: "SFU Burnaby",
    type: "medical",
    timeReported: "2023-10-30 (1:34pm)",
    status: "OPEN",
  },
  {
    location: "SFU Surrey",
    type: "elevator",
    timeReported: "2023-10-22 (5:30am)",
    status: "OPEN",
  },
];

function List() {
  return (
    <table className="incident-table">
      <thead>
        <tr>
          <th>Location</th>
          <th>Type</th>
          <th>Time Reported</th>
          <th>Status</th>
          <th></th>
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
  );
}

export default List;