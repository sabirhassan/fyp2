import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import medicineList from "./component-medicines";
import AddPatient from "./component-add-patient";
import followups from "./component-doctor-follow-up-requests";
import DoctorAppointments from "./component-doctor-appointments";
import patientList from "./component-doctor-patient-list";

export default class DoctorHome extends Component {

    constructor(props) {
        super(props);

        this.ClickSkinCancer = this.ClickSkinCancer.bind(this);
        this.ClickRatinopathy = this.ClickRatinopathy.bind(this);
       
    }

    ClickSkinCancer(i, event) {
        window.open("http://localhost:5001/")
    }

    ClickRatinopathy(i, event) {
        window.open("http://localhost:5000/")
    }

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
                            <Link className="nav-link"  onClick={this.ClickSkinCancer}>Skin Cancer</Link>
                            </li>
                            <li className="navbar-item">
                            <Link className="nav-link"  onClick={this.ClickRatinopathy}>Diabetic Ratinopathy</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/addpatient" id="addPatient" className="nav-link">Enter Patient</Link>
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
                <Route path="/medicineList" component={medicineList} />
                <Route path="/followups" component={followups} />
                <Route path="/addpatient" component={AddPatient} />
                <Route path="/appointments" component={DoctorAppointments} />
                <Route path="/patientlist" component={patientList} />
            </div>
            </Router>
        )
    }
}