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

function validate(contact,prescription) {
    // true means invalid, so our conditions got reversed
    return {
        prescription: prescription.length==0,
       contact: Validatephone(contact),
    };
}

export default class AddPrescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: '',
            name:'',
            nameList:[],
            checkName:true,
            doctor:'',
            doctorList:[],
            checkdoctor:true,
            showdoctor:false,
            showMedicine:false,
            medicine:'',
            dosage:'',
            days:'',
            timings:[],
            instructions:'',
            prescriptions : [],
            touched: {
                contact: false,
              }
            
        }
        this.onChangecontact = this.onChangecontact.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangedoctor = this.onChangedoctor.bind(this);
        this.onChangemedicine = this.onChangemedicine.bind(this);
        this.onChangedosage = this.onChangedosage.bind(this);
        this.onChangedays = this.onChangedays.bind(this);
        this.onChangeinstructions = this.onChangeinstructions.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     
    }
    onChangecontact(e) {
        this.setState({
            contact: e.target.value,
            nameList:[],
            checkName:true
        });
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangedoctor(e) {
        this.setState({
            doctor: e.target.value
        });
    }

    onChangemedicine(e) {
        this.setState({
            medicine: e.target.value
        });
    }

    onChangedosage(e) {
        this.setState({
            dosage: e.target.value
        });
    }

    onChangedays(e) {
        this.setState({
            days: e.target.value
        });
    }

    onChangeinstructions(e) {
        this.setState({
            instructions: e.target.value
        });
    }

    onSelect(selectedList, selectedItem) {
        this.state.timings.push(selectedItem.name);
      
    }

    onRemove(selectedList, removedItem) {
        for( var i = 0; i < this.state.timings.length; i++){ 
            if ( this.state.timings[i] === removedItem.name) { 
                this.state.timings.splice(i, 1); 
            }
        }
    }

    handleSubmitAdd(e){
        e.preventDefault();
        console.log(this.state.medicine,this.state.dosage,this.state.days,this.state.timings,this.state.instructions);
        
        var morning = false;
        var afternoon = false;
        var evening = false;

        for(var i=0;i<this.state.timings.length;i++)
        {   
            if(this.state.timings[i] == "morning")
            {
                morning = true;
            }
            else if(this.state.timings[i] == "noon")
            {
                afternoon = true;
            }
            else if(this.state.timings[i] == "evening")
            {
                evening = true;
            }
        }

        const item = {
            medicine:this.state.medicine,
            dosage:this.state.dosage,
            days:this.state.days,
            morning:morning,
            afternoon:afternoon,
            evening:evening,
            timings:this.state.timings,
            instructions:this.state.instructions
        }
        this.state.prescriptions.push(item);
        console.log(this.state.prescriptions);

        this.setState({
            medicine:'',
            dosage:'',
            days:'',
            instructions: '',
            
        });

    }

    onSubmit(e) {
        e.preventDefault();
        
        const obj= {
            contact: this.state.contact,
            name:this.state.name,
            doctor:this.state.doctor,
            prescriptions : this.state.prescriptions
        }

        console.log(obj)
        
        axios.post('http://localhost:4000/addPrescription', obj)
            .then(res => {
                console.log(res.data);
                if(res.data==="success")
                {
                    alert("prescription added Successfuly");
                    this.setState({
                        contact: '',
                        name:'',
                        nameList:[],
                        checkName:true,
                        doctor:'',
                        doctorList:[],
                        checkdoctor:true,
                        showdoctor:false,
                        showMedicine:false,
                        medicine:'',
                        dosage:'',
                        timings:[],
                        instructions:'',
                        prescriptions : [],
                        touched: {
                            contact: false,
                        }
            
                    });
                }
                else
                {
                    alert(res.data);
                }
            });


    }

     
    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      } 


    render() {

        const errors = validate(this.state.contact,this.state.prescriptions);
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
                        showdoctor:true,
                        showMedicine:true
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
         
        const createDoctorElement = () => {

            if(this.state.showdoctor)
            {
            

                if(this.state.checkdoctor)
                {// to stop useless api calls
                    const promise1 = new Promise(function(resolve, reject) {
                        
                        axios.post('http://localhost:4000/getdoctors')
                        .then(res => {
                            resolve(res.data)
                        });
                    });
                    
                    promise1.then((value) =>{
                        if(value!="empty")
                        this.setState({
                            doctorList: value,
                            doctor:value[0],
                            checkdoctor:false
                        });
                    });
                    
                }

                if(this.state.doctorList.length>0)
                {
                    return (
                            <div>
                            <label >Select Reference Doctor:</label>
                                <br></br>
                                <select value={this.state.doctor} onChange={this.onChangedoctor}>
                                {this.state.doctorList.map((n) => <option value={n}>{n}</option>)}
                                </select>
                                
                            </div>
                            );            
                }
                else
                {
                    return(
                    <div>
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

        const createMedicineElement = () => {

            const options= [{name: 'morning', id: 1},{name: 'noon', id: 2},{name: 'evening', id: 3}]

            if(this.state.showMedicine)
            {
                return (
                    
                    <div className="form-group" >
                    <form onSubmit={this.handleSubmitAdd}>
                    <h3>Add Medicine</h3>

                        <br></br>
                        <input 
                        type="text"
                        placeholder="Medicine"
                        required
                        colspan = "4"
                        className={"form-control"}
                        value={this.state.medicine}
                        onChange={this.onChangemedicine}
                        />


                        <input 
                        type="text"
                        placeholder="Dosage"
                        required 
                        colspan="4"
                        className={"form-control"}
                        value={this.state.dosage}
                        onChange={this.onChangedosage}
                        />

                        <input 
                        type="text"
                        pattern = "[0-9]*"
                        placeholder="days"
                        min="1"
                        required 
                        className={"form-control"}
                        value={this.state.days}
                        onChange={this.onChangedays}
                        />

                        <Multiselect
                        options={options} // Options to display in the dropdown
                        displayValue="name" // Property name to display in the dropdown options
                        placeholder="timings"
                        onSelect={this.onSelect}
                        onRemove={this.onRemove}
                        />
                        <textarea
                        placeholder="Instructions" 
                        className={"form-control"}
                        value={this.state.instructions}
                        onChange={this.onChangeinstructions}
                        />

                        <input 
                        type="submit"
                        value = "Add"
                        />
                    </form>

                    </div>
                    );
            }

            else
            {
                return(
                    <div>
                    </div>
                );
            }
        
        }

        const remove = param =>{
            for( var i = 0; i < this.state.prescriptions.length; i++){ 
                if ( this.state.prescriptions[i].medicine === param) { 
                    this.state.prescriptions.splice(i, 1); 
                }
            }   
        }

        const createMedicineTable = ()=> {
            return this.state.prescriptions.map((item, index) => {
               const { medicine, dosage,days, timings, instructions } = item 
               return (

                  <tr>
                     <td >{index}</td>
                     <td >{medicine}</td>
                     <td >{dosage}</td>
                     <td >{days}</td>
                     <td >{timings}</td>
                     <td >{instructions}</td>
                     <div>
                        <a href="#" onClick={() => remove(medicine)}>x</a>
                    </div>
                  </tr>
               )
            })
         }

        const nameElement = createNameElement(this.state.contact);
        const doctorElement = createDoctorElement();
        const medicineElement = createMedicineElement();
        const medicineTable = createMedicineTable();

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
                
                <br></br>

                <div>
                {doctorElement}
                </div>


                <div>
                {medicineElement}
                </div>


                    <h3>Medicine List</h3>
                    
                    <Table striped bordered hover >
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Days</th>
                        <th>Timings</th>
                        <th>Instructions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {medicineTable}
                    </tbody>
                    </Table>

                    <div className="form-group">
                        <input type="submit" disabled={isDisabled} value="Add prescription" onClick={this.onSubmit} className="btn btn-primary" />
                    </div>


            </div>
            
        )
    }
}