import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import Table from 'react-bootstrap/Table'
import axios from 'axios';

function Validatephone(contact) 
{
//    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneno = /^\+?([0-9]{12})\)?$/;
    if(contact.match(phoneno))
    {
    return false;
    }
    else
    {
    return true;
    }
}

function validate(contact) {
    // true means invalid, so our conditions got reversed
    return {
       contact: Validatephone(contact),
    };
}

export default class SeePrescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: '',
            name:'',
            nameList:[],
            checkName:true,
            prescription:[],
            checkPrescription:false,
            touched: {
                contact: false,
              }
            
        }
        this.onChangecontact = this.onChangecontact.bind(this);
        this.onChangename = this.onChangename.bind(this);
     
    }
    onChangecontact(e) {
        this.setState({
            contact: e.target.value,
            nameList:[],
            checkName:true,
            checkPrescription:false,
            prescription:[]
        });
    }

    onChangename(e) {
        this.setState({
            name: e.target.value,
            prescription:[],
            checkPrescription:true
        });
    }


     
    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      }


      render() {

        const errors = validate(this.state.contact);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        
        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];      
            return hasError ? shouldShow : false;
          };
    
        const createNameElement = () => {

            if(!Validatephone(this.state.contact))
            {
            
            const user= {
                contact:this.state.contact,
            }

            if(this.state.checkName)
            {// to stop useless api calls
                const promise1 = new Promise(function(resolve, reject) {
                    
                    axios.post('http://localhost:4000/getpatients', user)
                    .then(res => {
                        resolve(res.data)
                    });
                });
                
                promise1.then((value) =>{
                    if(value!="empty")
                    this.setState({
                        nameList: value,
                        name:value[0],
                        checkName:false,
                        checkPrescription:true,
                    });
                });
                
            }

                if(this.state.nameList.length>0)
                {
                    return (
                            <div>
                            <label >Select Patient:</label>
                                <br></br>
                                <select value={this.state.name} onChange={this.onChangename}>
                                {this.state.nameList.map((n) => <option value={n}>{n}</option>)}
                                </select>
                                
                            </div>
                            );            
                }
                else
                {
                    return(
                    <div className="invalid-feedback">
                            No patient exists with this contact.
                    </div>
                    );
                }  

            }
            else
            {
                return (
                    <div>
                    </div>
                    );
            }
        }          
         
        const createMedicineList = medicineList =>{
            return medicineList.map((item, index) => {
                const { medicine, dosage,days, morning,afternoon,evening, instructions } = item 
                return (
 
                   <tr>
                      <td >{medicine}</td>
                      <td >dosage: {dosage}</td>
                      <td >days: {days}</td>
                      <td >{morning?"morning":""}</td>
                      <td >{afternoon?"afternoon":""}</td>
                      <td >{evening?"evening":""}</td>
                      <td >{instructions}</td>
                      
                   </tr>
                )
             })
        }

        const createTableElement = () => {

            if(this.state.checkPrescription)
            {
            
                const user= {
                    contact:this.state.contact,
                    name:this.state.name,
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
                    const { contact, name,doctor, date, prescription } = item 
                    return (
     
                        <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>prescription #{index}</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td >contact:{contact}</td>
                            <td >patient:{name}</td>
                            <td >doctor:{doctor}</td>
                            <td >date:{date}</td>
                        </tr>
                        <tr>
                            <td >Medicine List</td>
                        </tr>

                        {createMedicineList(prescription)}
   
                        </tbody>
                        </Table>
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

        const nameElement = createNameElement();

        const tableElement = createTableElement() 

        return (
            <div className="form-group">
                    <div>
                    <label>Contact: </label>
                    <input 
                            type="text" 
                            className={shouldMarkError("contact") ? "form-control is-invalid" : "form-control"}
                            value={this.state.contact}
                            onChange={this.onChangecontact}
                            onBlur={this.handleBlur("contact")}
                            />
                            {shouldMarkError("contact") ?
                                <div className="invalid-feedback">
                                    Please provide a valid contact like +921112223456.
                                </div>
                            :""}

                    </div>

                <div>
                {nameElement}
                </div>

                <div>
                {tableElement}
                </div>
                
            </div>
            
        )
    }

}