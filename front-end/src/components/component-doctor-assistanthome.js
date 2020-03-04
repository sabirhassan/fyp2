import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AddPatient from "./component-add-patient";
import changePassword from "./component-change-password";
import AddPrescription from "./component-add-prescription";


export default class DoctorAssistantHome extends Component {
    render() {
        return (
            <Router>
            <div className="container">
                <div>
                <h3 className="navbar-brand">Automated Diagnostic System</h3>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <Link to="/Doctor's Assistant HomePage" className="navbar-brand">Doctor's Assistant HomePage</Link>
            
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            <Link to="/addpatient" className="nav-link">Enter Patient</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/addprescription" className="nav-link">Add Prescription</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/changepassword" className="nav-link">Change own Password</Link>
                            </li>
                        </ul>
                    </div>
                        
                </nav>
                <Route path="/DoctorAssistantHome" component={DoctorAssistantHome} />
                <Route path="/addpatient" component={AddPatient} />
                <Route path="/addprescription" component={AddPrescription} />
                <Route path="/changepassword" component={changePassword} />
                 
            </div>
            </Router>
        )
    }
}