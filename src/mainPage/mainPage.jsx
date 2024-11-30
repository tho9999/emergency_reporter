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
      <div className='mapContainer'>
        <Map onMove={changeVisibleIncidents} onMarkerClick={changeIncident} incidents={incidents}/>
      </div>
      {showMarker && (<div className='figureContainer'><Figure incident={incidents[incidentKey]}/></div>)}
      <div className='listContainer'>
      <List incidents={incidents} onMoreInfoClick={(index) => changeIncident(index, true)} />
      </div>
      <div className="formContainer">
        <FormButton onIncidentSubmit={addIncident}/>
      </div>
    </div>
  );
}

export default MainPage;
