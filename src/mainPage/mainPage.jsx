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

  const [visibleIncidents, setVisibleIncidents] = useState([]);

  const changeVisibleIncidents = (incidents) => {
    console.log("test");
    console.log(incidents);
    setVisibleIncidents(incidents);
  }
 

  const [showMarker, setShowMarker] = useState(false);

  const [incidentKey, setIncidentKey] = useState(null);

  const changeIncident = (key,index) => {
    setIncidentKey(key);
    setShowMarker(index);
    console.log(key,index);
  }
  

  // Test incident for map

  return (
    <div className="homePage">
      <Navbar />
      <Map onMove={changeVisibleIncidents} onMarkerClick={changeIncident} incidents={incidents}/>
      {showMarker && (<Figure incident={incidents[incidentKey]}/>)}
      <List incidents={visibleIncidents}/>
      <FormButton onIncidentSubmit={addIncident}/>
    </div>
  );
}

export default MainPage;
