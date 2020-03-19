import React, { Component } from 'react';
import axios from 'axios';
import Switch from 'react-switch'

export default class SeePrescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medicineName: '',
            patientContact: '',
            afternoon: false,
            morning: false,
            evening: false,

            touched: {
                medicineName: false,
                patientContact: false,
              }
        }
        this.onChangeMedicineName = this.onChangeMedicineName.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onAfternoonChange = this.onAfternoonChange.bind(this);
        this.onEveningChange = this.onEveningChange.bind(this);
        this.onMorningChange = this.onMorningChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }
    onEveningChange(e){
        this.setState({
            evening:e
        });
    }
    onMorningChange(m){
        this.setState({
            morning:m
        });
        console.log(this.state.morning)
    }
    onAfternoonChange(a){
        this.setState({
            afternoon:a
        });
    }
    onChangeMedicineName(e) {
        this.setState({
            medicineName: e.target.value
        });
    }

    onChangeContact(e) {
        this.setState({
            patientContact: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const med= {
            medicineName:this.state.medicineName,
            patientContact:this.state.patientContact,
            afternoon:this.state.afternoon,
            morning:this.state.morning,
            evening:this.state.evening,
            doctor:localStorage.getItem("name")

        }
        axios.post('http://localhost:4000/addPrescription', med)
            .then(res => {
                console.log(res.data);
                if(res.data==="success")
                {
                    alert("Prescription Created Successfuly");
                }
                else
                {
                    alert(res.data);
                }
            });
        this.state = {
            medicineName: '',
            patientContact: '',
            afternoon: false,
            morning: false,
            evening: false,
        }
    }


    render() {
        return (
             <div style={{marginTop: 10}}>
                <h3>ADD A SeePrescription</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Contact </label>
                        <input  type="text" 
                                className={"form-control"}
                                value={this.state.patientContact}
                                onChange={this.onChangeContact}
                                />
                                
                    </div>
                    
                    <div className="form-group">
                    <label>Medicine Name: </label>
                    <input type="text" 
                                className={"form-control"}
                                value={this.state.medicineName}
                                onChange={this.onChangeMedicineName}
                            />
                            
                    </div>
                    <div>
                    <p>Morining</p>
                    <Switch className = "react-switch"
                            onChange = {this.onMorningChange}
                            checked = {this.state.morning}
                            />
                    </div>
                    <div>
                    <p>Afternoon</p>
                    <Switch className = "react-switch"
                            onChange = {this.onAfternoonChange}
                            checked = {this.state.afternoon}
                            />
                    </div>
                    <div>
                    <p>Evening</p>
                    <Switch className = "react-switch"
                            onChange = {this.onEveningChange}
                            checked = {this.state.evening}
                            />
                    </div>
                  <br></br>
                    <div className="form-group">
                        <input type="submit"  value="Create Prescription" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        )};
};