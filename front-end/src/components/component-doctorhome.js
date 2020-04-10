import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import PredictSkinCancer from "./component-predict-skin-cancer";
import SeePrescription from "./component-see-prescription";
import medicineList from "./component-medicines";

export default class DoctorHome extends Component {
    render() {
        return (
            <Router>
            <div className="container">
                <div>
                <h3 className="navbar-brand">Automated Diagnostic System</h3>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <Link to="/Doctor's HomePage" className="navbar-brand">Doctor's HomePage</Link>
            
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            <Link to="/predictskincancer" className="nav-link">Skin Cancer</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/seeprescription" className="nav-link">See Patient Prescription</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/medicineList" className="nav-link">Medicines</Link>
                            </li>


                        </ul>
                    </div>
                        
                </nav>
                <Route path="/predictskincancer" component={PredictSkinCancer} />
                <Route path="/seeprescription" component={SeePrescription} />
                <Route path="/medicineList" component={medicineList} />
                
            </div>
            </Router>
        )
    }
}