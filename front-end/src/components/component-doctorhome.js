import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import PredictSkinCancer from "./component-predict-skin-cancer";
import SeePrescription from "./component-see-prescription";
import medicineList from "./component-medicines";
import followups from "./component-doctor-follow-up-requests";
import DoctorAppointments from "./component-doctor-appointments";
import patientList from "./component-doctor-patient-list";

export default class DoctorHome extends Component {
    render() {
        return (
            <Router>
            <div className="container">
                <div>
                <h3 className="navbar-brand">Automated Diagnostic System</h3>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <h3  id="pageName"  className="navbar-brand">Doctor HomePage</h3>
            
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            <Link to="/predictskincancer" className="nav-link">Skin Cancer</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/seeprescription" className="nav-link">See Patient Prescription</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/medicineList" id="medicine" className="nav-link">Medicines</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/patientlist" id="patientlist" className="nav-link">Patients</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/followups" id="followups" className="nav-link">Follow Up Requests</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/appointments" id="appointments" className="nav-link">Appointments</Link>
                            </li>

                        </ul>
                    </div>
                        
                </nav>
                <Route path="/predictskincancer" component={PredictSkinCancer} />
                <Route path="/seeprescription" component={SeePrescription} />
                <Route path="/medicineList" component={medicineList} />
                <Route path="/followups" component={followups} />
                <Route path="/appointments" component={DoctorAppointments} />
                <Route path="/patientlist" component={patientList} />
            </div>
            </Router>
        )
    }
}