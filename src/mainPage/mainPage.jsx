import './mainPage.css';
import Map from './mainPageComponents/map';
import List from './mainPageComponents/list';
import Figure from './mainPageComponents/figure';
import FormButton from './mainPageComponents/FormButton';
import React, { useState } from 'react';

function MainPage() {
  const [incidents, setIncidents] = useState([]);

  const addIncident = (newincident) => {
    setIncidents([...incidents, newincident]);
  };

  return (
    <div className="homePage">
      <Map incidents={incidents}/>
      <List incidents={incidents}/>
      <Figure />
      <FormButton onIncidentSubmit={addIncident}/>
    </div>
  );
}

export default MainPage;
