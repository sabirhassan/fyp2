import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import '../css/medicine.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddPrescription from "./component-add-prescription";
import SeePrescription from "./component-see-prescription";


export default class PatientList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patientList:[],
            checkRequests:true,
            seen: false,     
       
        }

        this.handleClick = this.handleClick.bind(this);
        this.closePop = this.closePop.bind(this)

    }

    closePop = () => {
        console.log("close popup")
        this.setState({
          seen: false
        });
      };
  

    handleClick(i, event) {
        this.setState({
            seen: true
          });
    }

      render() {

        const createlistItems = () => {

            if(this.state.checkRequests)
            {
            
                const promise1 = new Promise(function(resolve, reject) {
                    
                    axios.post('http://localhost:4000/getpatientslist')
                    .then(res => {
                        resolve(res.data)
                    });
                });
                
                promise1.then((value) =>{
                    console.log(value);
                    if(value!="empty")
                    this.setState({
                        patientList: value,
                        checkRequests:false,
                    });
                });
            
            }

            if(this.state.patientList.length>0)
            {
                return this.state.patientList.map((item, index) => {
                    const { name, contact,gender} = item 
                    return (
                        <tr key={index} onClick={this.handleClick.bind(this, index)}>
                            <td>{index}</td>
                            <td>{name}</td>
                            <td>{contact}</td>
                            <td>{gender}</td>
                        </tr>
                        )
                 })            
            }
            else
            {
                return (
                    <div>
                    </div>
                    );
            }
        }        
      
        const listItems =createlistItems()

        return (
            <div className="base">
                <div>
                    <h3>Patient List</h3>
                    <Table>
                    <thead>
                    <td>#</td>
                    <td>Name</td>
                    <td>Contact</td>
                    <td>Gender</td>
                    </thead>
                    <tbody>
                    {listItems}
                    </tbody>
                    
                    </Table>

                </div>

                <div  style={this.state.seen ? {display:'block'}:{display:'none'}}>
                    <Router>                    
                        <div className="popup">
                            <div className="content">
                                <span className="close"  onClick={this.closePop}>
                                    &times;
                                </span>
                                
                                <h3>Select Any Option!</h3>
                                
                                <br />  

                                <ul>
                                    <li >
                                    <Link to="/seeprescription" className="nav-link">See Patient Prescription</Link>
                                    </li>
                                    <li >
                                    <Link to="/addprescription" className="nav-link">Add Patient Prescription</Link>
                                    </li>
                                    
                                </ul>

                            </div>
                        </div>
                        <Route path="/seeprescription" component={SeePrescription} />
                        <Route path="/addprescription" component={AddPrescription} />
                    </Router>


                </div>

            </div>
            
        )
    }

}