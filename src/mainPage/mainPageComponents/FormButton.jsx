import "../mainPage.css";
import Form from "./Form";

import React, { useState } from 'react';

function FormButton() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={handleClick}>Report Incident</button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseForm}>
              &times;
            </span>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
}

export default FormButton;