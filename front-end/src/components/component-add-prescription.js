import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import {Datatable} from "@o2xp/react-datatable";
import AddIcon from '@material-ui/icons/Add';



var count = 0
var timings=["true","false"]
var id = 0


export default class AddPrescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doctor:'',
            doctorList:[],
            checkdoctor:true,
            showMedicine:false,
            data:[],
            options:{},
            gotData:false,
            medicineList:[],
            
        }
        this.onChangedoctor = this.onChangedoctor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     
    }

    onChangedoctor(e) {
        this.setState({
            doctor: e.target.value
        });
    }

 

    onSubmit(e) {
        e.preventDefault();
        
        const object = JSON.parse( localStorage.getItem("patient"))

        const obj= {
            contact: object.contact,
            name: object.name,
            doctor:this.state.doctor,
            prescriptions : this.state.data
        }

        var l = this.state.data
        for(var i=0;i<l.length;i++)
        {
            if(l[i]["medicine"].length===0 || l[i]["dosage"].length===0)
            {
                alert("some important information is missing")
                return
            }
        }

        console.log(obj)
        
        axios.post('http://localhost:4000/addPrescription', obj)
            .then(res => {
                console.log(res.data);
                if(res.data==="success")
                {
                    alert("prescription added Successfuly");
                    this.setState({
                        doctor:'',
                        doctorList:[],
                        checkdoctor:true,
                        showdoctor:false,
                        showMedicine:false,
                        data:[],
                        options:{},
                        gotData:false,
                        medicineList:[],
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

     
     


    actionsRow = ({ type, payload }) => {
        console.log(type);
        console.log(payload);
        if(type==="delete")
        {       
            console.log("befor",this.state.data)
            var list = this.state.data
            for( var i = 0; i < list.length; i++){ 
                
                if ( list[i]["id"] === payload.id) { 
                    list.splice(i, 1); 
                }
                this.setState({
                data:list
                })
        
            }
            console.log("after",this.state.data)
        }
        else if(type==="save")
        {
            console.log("befor",this.state.data)
            var list = this.state.data
            for( var i = 0; i < list.length; i++){ 
                
                if ( list[i]["id"] == payload.id) { 
                    list[i]["medicine"] = payload["medicine"]
                    list[i]["dosage"] = payload["dosage"]
                    list[i]["days"] = payload["days"]
                    list[i]["morning"] = payload["morning"]
                    list[i]["afternoon"] = payload["afternoon"]
                    list[i]["evening"] = payload["evening"]
                    list[i]["instructions"] = payload["instructions"]
                }
                this.setState({
                data:list
                })
        
            }
            console.log("after",this.state.data)
        
        }
    };

    addRow = ()=>{
        console.log("add row")
        var l = this.state.data
        var d = {
            id:id++,
            medicine: '',
            dosage:'',
            days: 5,
            morning: timings[0],
            afternoon: timings[0],
            evening: timings[0],
            instructions: "",
          }
        l.push(d)
        this.setState({
            data:l
        })
    }


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
                console.log(list)

                this.setState({
                    medicineList: list,
                    gotData:true,
                    options : {
                        title: "prescription datatable",
                        dimensions: {
                          datatable: {
                            width: "100%",
                            height: "480px"
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
                              id: "medicine",
                              label: "medicine",
                              colSize: "150px",
                              editable: true,
                              inputType: "select",
                              values: list
                            },
                            {
                                id: "dosage",
                                label: "dosage",
                                colSize: "150px",
                                editable: true,
                                inputType: "input",
                                dataType: "text"
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
                              inputType: "select",
                              values: timings
                            },
                            {
                                id: "afternoon",
                                label: "afternoon",
                                colSize: "50px",
                                editable: true,
                                inputType: "select",
                                values: timings
                            },
                            {
                                id: "evening",
                                label: "evening",
                                colSize: "50px",
                                editable: true,
                                inputType: "select",
                                values: timings
                            },
                            {
                                id: "instructions",
                                label: "instructions",
                                colSize: "100px",
                                editable: true,
                                dataType: "text",
                                inputType: "input"
                            }
                          ],
                          rows: this.state.data
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
                              onClick: () => {this.addRow()}
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

         
        const createDoctorElement = () => {
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

        const doctorElement = createDoctorElement();
        const Table = createTableElement();

        return (
            <div className="form-group">
                

                
                <div>
                {doctorElement}
                </div>


                <div>
                {Table}
                </div>


                <div className="form-group">
                    <input type="submit"  style={{marginTop:10}} value="Add prescription" onClick={this.onSubmit} className="btn-primary" />
                </div>


            </div>
            
        )
    }
}