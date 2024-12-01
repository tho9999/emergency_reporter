import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './mainPage/mainPage.jsx';
import CryptoJS from "crypto-js";

// Hash and store the initial passcode
const password = "admin";
const hashedPassword = CryptoJS.MD5(password).toString();
if (!localStorage.getItem("hashedPassword")) {
    localStorage.setItem("hashedPassword", hashedPassword);
    console.log("Password hashed and stored:", hashedPassword);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);

