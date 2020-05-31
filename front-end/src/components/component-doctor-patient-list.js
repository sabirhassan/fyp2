import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import '../css/medicine.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SelectedPatientHome from './component-selected-patient-home';


export default class PatientList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patientList:[],
            checkRequests:true,       
        }

        this.handleClick = this.handleClick.bind(this);
       
    }


  

    handleClick(i, event) {
          localStorage.setItem("patient",JSON.stringify(this.state.patientList[i]));
          ReactDOM.render(<SelectedPatientHome />, document.getElementById('root'))
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
            <div >
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



            </div>
            
        )
    }

}