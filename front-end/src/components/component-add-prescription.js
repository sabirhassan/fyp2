import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import {Datatable} from "@o2xp/react-datatable";
import AddIcon from '@material-ui/icons/Add';

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

var count = 0


// Advanced Example
const options = {
    title: "My super datatable",
    dimensions: {
      datatable: {
        width: "90%",
        height: "40%"
      },
      row: {
        height: "48px"
      }
    },
    keyColumn: "id",
    font: "Arial",
    data: {
      columns: [
        {
          id: "id",
          label: "id",
          colSize: "150px",
          editable: false
        },
        {
          id: "name",
          label: "name",
          colSize: "100px",
          editable: true,
          inputType: "select",
          values: ["green", "blue", "brown"]
        },
        {
          id: "days",
          label: "days",
          colSize: "80px",
          editable: true,
          dataType: "number",
          valueVerification: val => {
            let error = val > 100 ? true : false;
            let message = val > 100 ? "Value is too big" : "";
            return {
              error: error,
              message: message
            };
          }
        },
        {
          id: "morning",
          label: "morning",
          colSize: "50px",
          editable: true,
          dataType: "boolean",
          inputType: "checkbox"
        },
        {
            id: "noon",
            label: "noon",
            colSize: "50px",
            editable: true,
            dataType: "boolean",
            inputType: "checkbox"
        },
        {
            id: "evening",
            label: "evening",
            colSize: "50px",
            editable: true,
            dataType: "boolean",
            inputType: "checkbox"
        },
        {
            id: "instruction",
            label: "instruction",
            colSize: "100px",
            editable: true,
            dataType: "text",
            inputType: "input"
        }
      ],
      rows: []
    },
    features: {
      canEdit: true,
      canDelete: true,
      canSearch: true,
      canOrderColumns: true,
      additionalIcons: [
        {
          title: "Add medicine",
          icon: <AddIcon color="primary" />,
          onClick: () => alert("Add Medicine!")
        }
      ],
    }
  };


export default class AddPrescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: '',
            name:'',
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
            data:[],
            options:{},
            gotData:false,
            medicineList:[],
            touched: {
                contact: false,
              }
            
        }
        this.onChangecontact = this.onChangecontact.bind(this);
        this.onChangedoctor = this.onChangedoctor.bind(this);
        this.onChangemedicine = this.onChangemedicine.bind(this);
        this.onChangedosage = this.onChangedosage.bind(this);
        this.onChangedays = this.onChangedays.bind(this);
        this.onChangeinstructions = this.onChangeinstructions.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     
    }
    onChangecontact(e) {
        this.setState({
            contact: e.target.value,
            nameList:[],
            checkName:true
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


      actionsRow = ({ type, payload }) => {
        console.log(type);
        console.log(payload);
    };

    updateoptions = ()=>
    {

      if(this.state.gotData==false)
      {
        console.log(count++)

        const promise1 = new Promise(function(resolve, reject) {
                      
        axios.post('http://localhost:4000/getMedicines',)
        .then(res => {
            resolve(res.data)
          });
        });
      
        promise1.then((value) =>{
            if(value!="empty")
            {

                let list = []
                for(var i=0;i<value.length;i++)
                {
                    let n = value[i]["Drug Name"] + " " + value[i]["Strength"] + " " + value[i]["Form"]
                    list.push(n)
                }

                this.setState({
                    medicineList: list,
                    gotData:true,
                    options : {
                        title: "prescription datatable",
                        dimensions: {
                          datatable: {
                            width: "90%",
                            height: "40%"
                          },
                          row: {
                            height: "48px"
                          }
                        },
                        keyColumn: "id",
                        font: "Arial",
                        data: {
                          columns: [
                            {
                              id: "name",
                              label: "name",
                              colSize: "100px",
                              editable: true,
                              inputType: "select",
                              values: this.state.medicineList
                            },
                            {
                              id: "days",
                              label: "days",
                              colSize: "80px",
                              editable: true,
                              dataType: "number",
                              valueVerification: val => {
                                let error = val > 100 ? true : false;
                                let message = val > 100 ? "Value is too big" : "";
                                return {
                                  error: error,
                                  message: message
                                };
                              }
                            },
                            {
                              id: "morning",
                              label: "morning",
                              colSize: "50px",
                              editable: true,
                              dataType: "boolean",
                              inputType: "checkbox"
                            },
                            {
                                id: "noon",
                                label: "noon",
                                colSize: "50px",
                                editable: true,
                                dataType: "boolean",
                                inputType: "checkbox"
                            },
                            {
                                id: "evening",
                                label: "evening",
                                colSize: "50px",
                                editable: true,
                                dataType: "boolean",
                                inputType: "checkbox"
                            },
                            {
                                id: "instruction",
                                label: "instruction",
                                colSize: "100px",
                                editable: true,
                                dataType: "text",
                                inputType: "input"
                            }
                          ],
                          rows: []
                        },
                        features: {
                          canEdit: true,
                          canDelete: true,
                          canSearch: true,
                          canOrderColumns: true,
                          additionalIcons: [
                            {
                              title: "Add medicine",
                              icon: <AddIcon color="primary" />,
                              onClick: () => alert("Add Medicine!")
                            }
                          ],
                        }
                      }
            
                });
            }
        });

      }

      
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

        const createTableElement = () => {

            this.updateoptions()
            return(
            <div style={{marginTop: 10,zIndex:1}}>
            <h3>Medicine List</h3>
            <Datatable
            options={this.state.options}
            actions={this.actionsRow}
            />

            </div>
            )
    }

        const nameElement = createNameElement(this.state.contact);
        const doctorElement = createDoctorElement();
        const Table = createTableElement();

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
                {Table}
                </div>


                <div className="form-group">
                    <input type="submit" disabled={isDisabled} style={{marginTop:10}} value="Add prescription" onClick={this.onSubmit} className="btn-primary" />
                </div>


            </div>
            
        )
    }
}