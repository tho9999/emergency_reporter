import React from "react";
import "../mainPage.css"; 
import logo from "./logo.png"; 

const InfoHeader = () => {
    return (
      <>
        <div className="header">
            <img 
            src={logo}
            alt="Metro Vancouver Logo" 
            className="logo" 
            />
            <h1>Metro Vancouver Emergency Reporting and Monitoring System</h1>
        </div>
        <div className="report-info">
          <h2>When to report an incident to <strong>9-1-1</strong></h2>
          <p>
            9-1-1 is for police, fire, or medical emergencies when immediate
            action is required: someone’s health, safety, or property is in
            jeopardy or a crime is in progress.
          </p>
          <div className="situations">
            <div className="col emergencies">
              <h3>
                Examples of <span>Emergencies</span>
              </h3>
              <ul>
                <li>
                  <img
                    src="https://www.ecomm911.ca/wp-content/uploads/2018/03/icon-robbery.png"
                    alt="Robbery in Progress"
                  />
                  <span>
                    Robbery
                    <br />
                    in Progress
                  </span>
                </li>
                <li>
                  <img
                    src="https://www.ecomm911.ca/wp-content/uploads/2018/03/icon-fire.png"
                    alt="Fire"
                  />
                  <span>Fire</span>
                </li>
                <li>
                  <img
                    src="https://www.ecomm911.ca/wp-content/uploads/2018/03/icon-car-crash.png"
                    alt="Hurt in a Car Crash"
                  />
                  <span>
                    Hurt
                    <br />
                    in a Car Crash
                  </span>
                </li>
              </ul>
            </div>
            <div className="col non-emergencies">
              <h3>
                Examples of <span>Non-Emergencies</span>
              </h3>
              <ul>
                <li>
                  <img
                    src="https://www.ecomm911.ca/wp-content/uploads/2018/03/icon-bicycle.png"
                    alt="Stolen Bicycle"
                  />
                  <span>
                    Stolen
                    <br />
                    Bicycle
                  </span>
                </li>
                <li>
                  <img
                    src="https://www.ecomm911.ca/wp-content/uploads/2018/03/icon-vehicle-break-in.png"
                    alt="Vehicle Break-in"
                  />
                  <span>
                    Vehicle
                    <br />
                    Break-in
                  </span>
                </li>
                <li>
                  <img
                    src="https://www.ecomm911.ca/wp-content/uploads/2018/03/icon-noise.png"
                    alt="Noise Complaint"
                  />
                  <span>
                    Noise
                    <br />
                    Complaint
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };
  

export default InfoHeader;
