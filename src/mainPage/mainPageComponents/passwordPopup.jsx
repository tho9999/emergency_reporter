import "../mainPage.css";

import React, { useState } from 'react';
import Incident from '../../incident.js';
import CryptoJS from "crypto-js";
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";

function PasswordPopup({onClose, onPasswordCorrect}) {
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        // get the stored hashed password
        const storedHashedPassword = localStorage.getItem("hashedPassword");

        // hash the entered password and compare it to the stored password
        const enteredHashedPassword = CryptoJS.MD5(password).toString();

        if(enteredHashedPassword === storedHashedPassword) {
            onPasswordCorrect();
        }
        else {
            setErrorMessage("Incorrect password, please try again.");
        }
    
    }

    return (
        <div className="password-popup-overlay">
            <div className="password-popup">
                <h2>Enter Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button type="submit">Submit</button>
                    <button type="cancel" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordPopup;