import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './mainPage/mainPage';
import ReportPage from './reportPage/reportPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/report" element={<ReportPage />} />
    </Routes>
  </Router>
);

