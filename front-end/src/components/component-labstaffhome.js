import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class LabStaffHome extends Component {
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
                    
                    <h3  id="pageName"  className="navbar-brand">Lab Assistant HomePage</h3>
            
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            <Link className="nav-link"  onClick={this.ClickSkinCancer}>Skin Cancer</Link>
                            </li>
                            <li className="navbar-item">
                            <Link className="nav-link"  onClick={this.ClickRatinopathy}>Diabetic Ratinopathy</Link>
                            </li>
                        </ul>
                    </div>
                        
                </nav>

            </div>
            </Router>
        )
    }
}