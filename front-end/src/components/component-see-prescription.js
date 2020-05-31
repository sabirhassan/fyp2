import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import '../css/medicine.css';


export default class SeePrescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prescription:[],
            checkPrescription:true,
            
        }
    }

      render() {

        const createTableElement = () => {

            if( this.state.checkPrescription)
            {
            
                const obj = JSON.parse( localStorage.getItem("patient"))
                const user= {
                    contact:obj.contact,
                }

                const promise1 = new Promise(function(resolve, reject) {
                    
                    axios.post('http://localhost:4000/getPrescription', user)
                    .then(res => {
                        resolve(res.data)
                    });
                });
                
                promise1.then((value) =>{
                    console.log(value);
                    if(value!="empty")
                    this.setState({
                        prescription: value,
                        checkPrescription:false,
                    });
                });
            
            }

            if(this.state.prescription.length>0)
            {
                return this.state.prescription.map((item, index) => {
                    const { contact,doctor, date, medicine, dosage,days, morning,afternoon,evening, instructions,status,notify  } = item 
                    return (
     
                        <div >
                        <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>prescription #{index}</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td >contact:{contact}</td>
                            <td >doctor:{doctor}</td>
                            <td >date:{date}</td>
                            <td >medicine:{medicine}</td>
                            <td >dosage: {dosage}</td>
                            <td >days: {days}</td>
                            <td >{morning?"morning":""}</td>
                            <td >{afternoon?"afternoon":""}</td>
                            <td >{evening?"evening":""}</td>
                            <td >instructions:{instructions}</td>
                            <td >Current:{status?"True":"False"}</td>
                            
                        </tr>

                        </tbody>
                        </Table>
                        </div>
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

     
        const tableElement = createTableElement() 

        return (
            <div >
                <div>
                {tableElement}
                </div>
            </div>
            
        )
    }

}