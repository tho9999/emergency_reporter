import "../mainPage.css";

import React, { useState } from 'react';
import { OpenStreetMapProvider } from "leaflet-geosearch";  
import Incident from '../../incident.js';
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";

function Form({onIncidentSubmit}) {
    const [formData, setFormData] = useState({
        witness_first_name: "",
        witness_last_name: "",
        witness_phone: "",
        emergency_info: "",
        longitude: "",
        latitude: "",
        address: "",
        picture: null,
        comments: "",
    });

    const [errors, setErrors] = useState({});

    const [submitted, setSubmitted] = useState(false);

    const [addressSuggestions, setAddressSuggestions] = useState([]);

    const [showSuggestions, setShowSuggestions] = useState(false);


    
    const fetchCoordinates = async (address) => {
        // Use the OpenStreetMapProvider to fetch the coordinates
        const provider = new OpenStreetMapProvider();
        const results = await provider.search({ query: address });
        console.log(results);
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

    const handleSuggestionSelect = (suggestion) => {
        setFormData({
          ...formData,
          address: suggestion.label,
        });
        setAddressSuggestions([]);
        setShowSuggestions(false);
      };

    const handleChange = (e) => {

        if (e.target.name === "picture"){
            const file = e.target.files[0];
            setFormData({
                ...formData,
                [e.target.name]: file,
            })
        } else if (e.target.name === "address") {
            const inputValue = e.target.value;
            setFormData({
              ...formData,
              [e.target.name]: inputValue,
            });
      
            if (inputValue) {
               
                    const provider = new OpenStreetMapProvider();
                    
                    provider.search({ query: inputValue }).then((results) => {
                        setAddressSuggestions(results);
                        setShowSuggestions(true);
                    }).catch((error) => { // Catch the error here
                        return;
                      });
            
            } else {
              setAddressSuggestions([]);
              setShowSuggestions(false);
            }
          }
        else{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    

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

        //Invoke the fetchCoordinates function if no coordinates are provided
        var coordinates = null;
        if(formData.latitude === "" || formData.longitude === ""){
            try {
                coordinates = await fetchCoordinates(formData.address);
            }   
            catch (error) {
                console.error("Error fetching coordinates.");
            }
        }
        else {
            coordinates = {latitude: formData.latitude, longitude: formData.longitude};
        }
        if (!coordinates) {
            // If the coordinates are not found, set the error
            setErrors({ address: "Could not resolve the address. Please check it and try again." });
            return;
        }

        var incident = new Incident(
            formData.witness_first_name,
            formData.witness_last_name,
            formData.witness_phone,
            formData.emergency_info,
            formData.longitude,
            formData.latitude,
            formData.address,
            formData.picture,
            formData.comments);

        console.log(incident);

        onIncidentSubmit(incident);

        setSubmitted(true);

    };

    return (
        <div>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="3">
                                    <h2>Reporting New Incident</h2>
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
                                        placeholder="e.g. 0123456789"
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
                                        placeholder="e.g. a child in danger or a house is on fire"
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
                                        placeholder="e.g. 2120 Cambie St, Vancouver, BC V5Z 4N6"
                                        value={formData.address}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        
                                    />
                                </td>
                                <td>
                                    {showSuggestions && addressSuggestions.length > 0 && (
                                    <ul
                                        className="address-suggestions"
                                        
                                    >
                                        {addressSuggestions.map((suggestion) => (
                                        <li
                                            className="suggested-address"
                                            key={suggestion.x}
                                            onClick={() => handleSuggestionSelect(suggestion)}
                                        >
                                            {suggestion.label}
                                        </li>
                                        ))}
                                    </ul>
                                    )}
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
                                    <label>Comments:</label>
                                </td>
                                <td colSpan="2">
                                    <textarea
                                        rows="4"
                                        cols="50"
                                        name="comments"
                                        placeholder="e.g. a man about 6 ft tall, in black trench coat, black hat is fighting a little girl."
                                        value={formData.comments}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button type="submit">Submit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            ) : (
                <div>
                    <h1>Incident reported</h1>
                </div>
            )}
        </div>
    );
}

export default Form;