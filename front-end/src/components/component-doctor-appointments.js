import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'

export default class DoctorAppointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requestList:[],
            checkRequests:true       
        }

        this.handleReject = this.handleReject.bind(this);

    }



    handleReject(i, event) {
        const user= {
            id:this.state.requestList[i].id,
        }

        const promise1 = new Promise(function(resolve, reject) {
            
            axios.post('http://localhost:4000/cancelAppointment', user)
            .then(res => {
                resolve(res.data)
            });
        });
        
        promise1.then((value) =>{
            console.log(value);
            if(value=="success")
            {
                let items = this.state.requestList
                items.splice(i,1)
                this.setState({
                    requestList:items
                });
            }
        });
    }

      render() {


        const createlistItems = () => {

            if(this.state.checkRequests)
            {
            
                const user= {
                    email:localStorage.getItem("email"),
                }

                const promise1 = new Promise(function(resolve, reject) {
                    
                    axios.post('http://localhost:4000/getAppointments', user)
                    .then(res => {
                        resolve(res.data)
                    });
                });
                
                promise1.then((value) =>{
                    console.log(value);
                    if(value!="empty")
                    this.setState({
                        requestList: value,
                        checkRequests:false,
                    });
                });
            
            }

            if(this.state.requestList.length>0)
            {
                return this.state.requestList.map((item, index) => {
                    const { contact, followondate,time} = item 
                    return (
                        <tr key={index} >
                            <td>{contact}</td>
                            <td>{followondate}</td>
                            <td>{time}</td>
                            <td><input type="submit"  value="Cancel" onClick={this.handleReject.bind(this, index)} className="btn-primary" /></td>
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
            <div className="form-group">
                   <div>
                    <h3>Appointments</h3>
                    <Table>
                    <thead>
                    <td>Patient Contact</td>
                    <td>Date</td>
                    <td>Time</td>
                    <td>Cancel</td>
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