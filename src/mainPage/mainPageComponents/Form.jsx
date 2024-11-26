import "../mainPage.css";

import React, { useState } from 'react';

import Incident from '../../incident.js';
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";

function Form({onIncidentSubmit}) {
    const [formData, setFormData] = useState({
        witness_first_name: "",
        witness_last_name: "",
        witness_phone: "",
        emergency_info: "",
        location: "",
        picture: null,
        comments: "",
    });

    const [errors, setErrors] = useState({});

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {

        if (e.target.name === "picture"){
            const file = e.target.files[0];
            setFormData({
                ...formData,
                [e.target.name]: file,
            })
        }
        else{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
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

        if (formData.location === ""){
            areErrors = true;
            newErrors.location = "Must enter a location";
        }
        if (areErrors){
            setErrors(newErrors);
            return;
        }



        var incident = new Incident(
            formData.witness_first_name,
            formData.witness_last_name,
            formData.witness_phone,
            formData.emergency_info,
            formData.location,
            formData.picture,
            formData.comments);

        console.log(incident);

        onIncidentSubmit(incident);

        setSubmitted(true);

    };

    return (
        <div>
            {!submitted ? (<form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>
                                    Witness First Name:
                                </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="witness_first_name"
                                    value={formData.witness_first_name}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <label>
                                    Witness Last Name:
                                </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="witness_last_name"
                                    value={formData.witness_last_name}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4"> 
                                {errors.witness_first_name && (
                                <div className="error">{errors.witness_first_name}</div>
                                )}
                                {errors.witness_last_name && (
                                <div className="error">{errors.witness_last_name}</div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>
                                    Witness Phone:
                                </label>
                            </td>
                            <td>
                                <input
                                    type="tel"
                                    name="witness_phone"
                                    value={formData.witness_phone}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        
                        <tr>
                        
                            <td colSpan="4"> 
                                    {errors.witness_phone && (
                                    <div className="error">{errors.witness_phone}</div>
                                    )}
                                </td>
                        
                        </tr>


                        <tr>
                            <td>
                                <label>
                                    Emergency type:
                                </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="emergency_info"
                                    value={formData.emergency_info}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="4"> 
                                    {errors.emergency_info && (
                                    <div className="error">{errors.emergency_info}</div>
                                    )}
                                </td>
                        </tr>

                        <tr>
                            <td>
                                <label>
                                    Location:
                                </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </td>
                            
                        </tr>
                        <tr>
                            <td colSpan="4"> 
                                    {errors.location && (
                                    <div className="error">{errors.location}</div>
                                    )}
                                </td>
                        </tr>
                        <tr>
                            <td>
                                <label>
                                    Picture:
                                </label>
                            </td>
                            <td>
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
                                <label>
                                    Comments:
                                </label>
                            </td>
                            <td>
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
                            <td colSpan="3">
                                <button type="submit">Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>) : (
                <div>
                    <h1>Incident reported</h1>
                </div>
            )}
            
        </div>
    );
}

export default Form;