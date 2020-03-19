import React, { Component } from 'react';
import axios from 'axios';


export default class AddPrescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: '',
            prescriptions : [],
            touched: {
                contact: false,
              }
            
        }
        this.onChangecontact = this.onChangecontact.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
    }
    onChangecontact(e) {
        this.setState({
            contact: e.target.value
        });
    }

    onClickSearch(e) {
        e.preventDefault();
        var phone = this.state.contact;
        var name = localStorage.getItem("name");
        axios.get('http://localhost:4000/getPrescription',{ params: {contact: phone}})
            .then(res => {
                if(!res.data.isEmpty){
                console.log("here",res.data.medicine[0].doctor);
                this.setState({
                    prescriptions: res.data.medicine
                });
            }
            else{
                alert("No record found");
            }
            });

    }



    render() {
        return (
            <div>
                <p>Welcome to AddPrescription  Component!!</p>
                <div>
                <div className="form-group">
                        <label>Contact: </label>
                        <input 
                                type="text" 
                                className={"form-control"}
                                value={this.state.contact}
                                onChange={this.onChangecontact}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" onClick={this.onClickSearch} value="Show Record" className="btn btn-primary" />
                    </div>
                    <div>
                        {this.state.prescriptions.map(prescription => (
                            <div style={{backgroundColor: "lightblue"}}>
                            <div>Medicine Name: {prescription.medicine}</div>
                            <div>Added By: {prescription.doctor}</div>
                            <div>Should take on</div>
                            {prescription.morning ? (
                                <div>morning</div>
                            ):(
                                <div>Not morning</div>
                            )
                            }
                            {prescription.evening ? (
                                <div>evening</div>
                            ):(
                                <div>Not evening</div>
                            )
                            }
                            {prescription.afternoon ? (
                                <div>afternoon</div>
                            ):(
                                <div>Not afternoon</div>
                            )
                            }
                            <br style={{backgroundColor: "white"}} ></br>
                            </div>
                            
                        ))}
                    </div>
                </div>
            </div>
            
        )
    }
}