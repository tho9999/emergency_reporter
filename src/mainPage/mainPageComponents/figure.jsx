import React, { useState } from "react";
import "../mainPage.css";
import PasswordPopup from "./passwordPopup.jsx";
import ChangeIncident from "./changeIncident";

function Figure({ incident, onUpdateIncident, onDeleteIncident }) {
    
    // If there is a picture then create URL to picture if not pictureSource is null
    const pictureSource = incident.getPicture() ? URL.createObjectURL(incident.getPicture()) : null;

    // Password handling and display change incident form
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [showChangeIncidentForm, setShowChangeIncidentForm] = useState(false);

    // Function to handle the success of the password verification
    const handlePasswordCorrect = () => {
        setShowPasswordPopup(false);
        setShowChangeIncidentForm(true);
        // Logic to display the form or navigate to edit can go here
        console.log("Password correct. Proceeding to edit incident...");
    };

    // Function to handle saving changes to the incident
    const handleSaveChanges = (formData) => {
        // Logic to save the updated incident data can go here
        console.log("Saving changes to incident...");
        console.log(formData);
        setShowChangeIncidentForm(false);
        onUpdateIncident(formData);

    };

    const handleDelete = () => {
        onDeleteIncident(incident);
    };

    return (
        <figure>
            <h2>Incident Details</h2>
            {incident.getPicture() && <img src={pictureSource} alt="Incident" />}
            <p><strong>Incident type: </strong>{incident.getEmergencyInfo()}</p>
            <p><strong>Location: </strong>{incident.getAddress()}</p>
            <p><strong>Reported by: </strong>{incident.getWitnessName()}  ({incident.getWitnessPhone()})</p>
            <p><strong>Time: </strong>{incident.getTime()} </p>
            <p><strong>Status: </strong>{incident.getStatus()} {" "}
                <button className="change-button" onClick={() => setShowPasswordPopup(true)}>Change</button>
            </p>
            <p><strong>Comments: </strong>{incident.getComments()} </p>

            {/* Show password input popup if triggered */}
            {showPasswordPopup && <PasswordPopup onClose={() => setShowPasswordPopup(false)} onPasswordCorrect={handlePasswordCorrect}/>}
        
            {/* Show change incident form if triggered */}
            {showChangeIncidentForm && <ChangeIncident 
                incident={incident}
                onCancel={() => setShowChangeIncidentForm(false)}
                onUpdate={handleSaveChanges}
                onDelete={handleDelete} />}
        </figure>
    );
}

export default Figure;