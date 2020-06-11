import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import '../css/home.css'
import axios from 'axios';

import Register from "./component-register-user";
import changePassword from "./component-change-password";
import resetPassword from "./component-reset-password";

export default class AdminHome extends Component {

    handleclick(i, event) {
        const promise1 = new Promise(function(resolve, reject) {
            axios.get('http://localhost:4000/updatePrescriptionStatus')
            .then(res => {
                resolve(res.data)
            });
        });
        
        promise1.then((value) =>{
            if(value == "empty")
            {
                alert("nothing to Update");
            }
            else if(value == "Success")
            {
                alert("Status Updated")
            }
            else{
                alert(value);
            }


        });
    }

    render() {
        return (
            <Router>
            <div className="container">
                <div>
                <h3 className="navbar-brand">Automated Diagnostic System</h3>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <h3 id= "pageName" className="navbar-brand">Admin HomePage</h3>
            
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            <Link to="/register" className="nav-link">Register User</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/resetpassword" className="nav-link">Reset Password</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/changepassword" className="nav-link">Change own Password</Link>
                            </li>
                            <li className="navbar-item">
                            <Link className="nav-link" onClick={this.handleclick}>Update Prescription Status</Link>
                            </li>
                        </ul>
                    </div>
                        
                </nav>
                <Route path="/adminhome" component={AdminHome} />
                <Route path="/register" component={Register} />
                <Route path="/resetpassword" component={resetPassword} />
                <Route path="/changepassword" component={changePassword} />
                 
            </div>
            </Router>
        )
    }
}