import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import SeePrescription from "./component-see-prescription";
import AddPrescription from "./component-add-prescription";
import DoctorHome from "./component-doctorhome"


export default class SelectedPatientHome extends Component {

    constructor(props) {
        super(props);

        this.ClickHome = this.ClickHome.bind(this);
       
    }

    ClickHome(i, event) {
        ReactDOM.render(<DoctorHome />, document.getElementById('root'))
  }


    render() {

        const obj = JSON.parse( localStorage.getItem("patient"))


        return (
            <Router>
            <div className="container">
                <div>
                <h3 className="navbar-brand">Automated Diagnostic System</h3>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <h4    className="navbar-brand">Patient: {obj.name}</h4>
                    <h4    className="navbar-brand">Contact: {obj.contact}</h4>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            <Link to="/seeprescription" className="nav-link">See Patient Prescription</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/Addprescription" className="nav-link">Add Patient Prescription</Link>
                            </li>
                            <li className="navbar-item">
                            <Link className="nav-link" onClick={this.ClickHome}>Home</Link>
                            </li>
            
                        </ul>
                    </div>
                        
                </nav>
                <Route path="/seeprescription" component={SeePrescription} />
                <Route path="/Addprescription" component={AddPrescription} />
            </div>
            </Router>
        )
    }
}