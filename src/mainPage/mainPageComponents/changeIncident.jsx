import React, { useState } from 'react';
import "../mainPage.css";
import { OpenStreetMapProvider } from "leaflet-geosearch"; 
import Incident from '../../incident.js';


function ChangeIncident({ incident, onCancel, onUpdate }) {
    // State to store form data, initialized with the existing incident data
    const [formData, setFormData] = useState({
        witness_first_name: incident.getWitnessName().split(" ")[0],
        witness_last_name: incident.getWitnessName().split(" ")[1],
        witness_phone: incident.getWitnessPhone(),
        emergency_info: incident.getEmergencyInfo(),
        address: incident.getAddress(),
        latitude: incident.getLocation()[0],
        longitude: incident.getLocation()[1],
        picture: incident.getPicture(),
        status: incident.getStatus(),
        comments: incident.getComments(),
    });

    const [errors, setErrors] = useState({});



    const fetchCoordinates = async (address) => {
        // Use the OpenStreetMapProvider to fetch the coordinates
        const provider = new OpenStreetMapProvider();
        const results = await provider.search({ query: address });
        // Check if the results are found
        if (results && results.length > 0) {
            const longitude= results[0].bounds[0][1];
            const latitude= results[0].bounds[0][0]; 
            // Set the form data with the coordinates
            formData.longitude = longitude;
            formData.latitude = latitude;
            if (isNaN(longitude) || isNaN(latitude)) {
                // If the coordinates are not numbers, return null
                console.error("Coordinates not found.");
                return null; 
            }
            // Return the coordinates if theres a number
            return { latitude: latitude, longitude: longitude };
        } else {
            // If the address is not found, return null
            console.error("Address not found.");
            return null; 
        }
    }

    // Handle form data change
    const handleChange = (e) => {

        if (e.target.name === "picture"){
            const file = e.target.files[0];
            setFormData({
                ...formData,
                [e.target.name]: file,
            })
        } else{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        var areErrors = false;

        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(formData.witness_first_name) || formData.witness_first_name === ""){
            areErrors = true;
            newErrors.witness_first_name = "First name must not be empty and contain only letters";
        }

        if (!nameRegex.test(formData.witness_last_name) || formData.witness_last_name === ""){
            areErrors = true;
            newErrors.witness_last_name = "Last name must not be empty and contain only letters";
        }


        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.witness_phone)){
            areErrors = true;
            newErrors.witness_phone = "Must enter a valid 10-digit phone number";
        }

        if (formData.emergency_info === ""){
            areErrors = true;
            newErrors.emergency_info = "Must enter emergency type";
        }

        if (formData.address === ""){
            areErrors = true;
            newErrors.address = "Must enter a address/location";
        }

        if (areErrors){
            setErrors(newErrors);
            return;
        }

        //Invoke the fetchCoordinates function
        var coordinates = null;
        if(formData.latitude === "" || formData.longitude === ""){
            coordinates = await fetchCoordinates(formData.address);
        }
        else {
            coordinates = {latitude: formData.latitude, longitude: formData.longitude};
        }
        if (!coordinates) {
            // If the coordinates are not found, set the error
            setErrors({ address: "Could not resolve the address. Please check it and try again." });
            return;
        }
        console.log("new address is " + formData.address);
        console.log("new coordinates are " + coordinates.latitude + " " + coordinates.longitude);

        // Update the incident with the new data
        incident.setWitnessFirstName(formData.witness_first_name);
        incident.setWitnessLastName(formData.witness_last_name);
        incident.setWitnessPhone(formData.witness_phone);
        incident.setEmergencyInfo(formData.emergency_info);
        incident.setLocation([parseFloat(formData.latitude), parseFloat(formData.longitude)]);
        incident.setAddress(formData.address);
        incident.setPicture(formData.picture);
        incident.setStatus(formData.status);
        incident.setComments(formData.comments);

        console.log(incident);
        onUpdate(incident);
    };

    return (
        <div className="form-overlay">
            <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="3">
                                    <h2>Editing Incident</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Witness First Name:</label>
                                </td>
                                <td colSpan="2">
                                    <input
                                        type="text"
                                        name="witness_first_name"
                                        value={formData.witness_first_name}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="2">
                                    {errors.witness_first_name && (
                                        <div className="error">{errors.witness_first_name}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Witness Last Name:</label>
                                </td>
                                <td colSpan="2">
                                    <input
                                        type="text"
                                        name="witness_last_name"
                                        value={formData.witness_last_name}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="2">
                                    {errors.witness_last_name && (
                                        <div className="error">{errors.witness_last_name}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Witness Phone:</label>
                                </td>
                                <td colSpan="2">
                                    <input
                                        type="tel"
                                        name="witness_phone"
                                        value={formData.witness_phone}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="2">
                                    {errors.witness_phone && (
                                        <div className="error">{errors.witness_phone}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Emergency Type:</label>
                                </td>
                                <td colSpan="2">
                                    <input
                                        type="text"
                                        name="emergency_info"
                                        value={formData.emergency_info}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="2">
                                    {errors.emergency_info && (
                                        <div className="error">{errors.emergency_info}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Address:</label>
                                </td>
                                <td colSpan="2">
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="2">
                                    {errors.address && (
                                        <div className="error">{errors.address}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Coordinates:</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="latitude"
                                        placeholder="Latitude"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="longitude"
                                        placeholder="Longitude"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Picture:</label>
                                </td>
                                <td colSpan="2">
                                    <input
                                        type="file"
                                        name="picture"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Status:</label>
                                </td>
                                <td colSpan="2">
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="OPEN">OPEN</option>
                                        <option value="RESOLVED">RESOLVED</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Comments:</label>
                                </td>
                                <td colSpan="2">
                                    <textarea
                                        rows="4"
                                        cols="50"
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button type="submit">Update</button>
                                    <button type="button" onClick={onCancel}>Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
        </div>
    );
}

export default ChangeIncident;
