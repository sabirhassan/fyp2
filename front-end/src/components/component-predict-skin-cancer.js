import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


export default class PredictSkinCancer extends Component {

    constructor(props) {
        super(props);

        this.state = {

              }
        }
    

    render() {
    
        return (
            <div style={{marginTop: 10}}>
                <h3>Predict skin Cancer</h3>


                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="progress progress-bar progress-bar-striped progress-bar-animated mb-2">
                                Loading Model
                            </div>
        
                        </div>
        
                    </div>
        
                    <div className="row">
                        <div className="col-6">
                            <input id="image-selector" className="form-control border-0" type="file"/>
                        </div>

                        <div className="col-6">
                            <button id="predict-button" className="btn btn-dark float-right">Predict</button>
                        </div>
        
                    </div>
                    
                    <div className="row">
                        <div className="col">
                            <h2 className="ml-3">Predictions</h2>
                            <ol id="prediction-list"></ol>
                        </div>
        
                    </div>
                    
                    <div className="row">
                        <div className="col-12">
                            <h2 className="ml-3">Image</h2>
                            <img id="selected-image"/>
                        </div>
        
                    </div>
        
                </div>
     
            </div>
        )
    }
}