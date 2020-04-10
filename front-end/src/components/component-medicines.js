import React, { Component } from 'react';

import {Datatable} from "@o2xp/react-datatable";
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import '../css/medicine.css';


let option = {
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
            id: "Drug Name",
            label: "Name",
            colSize: "100px",
            editable: true,
            dataType: "text",
            inputType: "input"
        },
        {
            id: "Form",
            label: "Form",
            colSize: "100px",
            editable: true,
            dataType: "text",
            inputType: "input"
        },
        {
            id: "Strength",
            label: "Strength",
            colSize: "100px",
            editable: true,
            dataType: "text",
            inputType: "input"
        },
        {
            id: "Active Ingredient",
            label: "Active Ingredient",
            colSize: "100px",
            editable: true,
            dataType: "text",
            inputType: "input"
        },
      
        ],

      rows: []
    },
    features: {
      canEdit: true,
      canDelete: true,
      canSearch: true,
      canOrderColumns: true,
      canSelectRow: true,
      rowsPerPage: {
        available: [10, 25, 50, 100],
        selected: 50
      },
    }
  };

var count = 0

export default class medicineList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            gotData:false,
            data:[],
            options:{},
            name:'',
            form:'',
            ingredient:'',
            strength:'',
            seen: false,     
        }
        this.onChangename = this.onChangename.bind(this)
        this.onChangeform = this.onChangeform.bind(this)
        this.onChangestrength = this.onChangestrength.bind(this)
        this.onChangeingredient = this.onChangeingredient.bind(this)
        this.onSubmitModal = this.onSubmitModal.bind(this)
        this.togglePop = this.togglePop.bind(this)
        
    }
    
    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }


    onChangeform(e) {
      this.setState({
          form: e.target.value
      });
    }

    onChangestrength(e) {
      this.setState({
          strength: e.target.value
      });
    }

    onChangeingredient(e) {
      this.setState({
          ingredient: e.target.value
      });
    }

    onSubmitModal(evt) {
      evt.preventDefault();

      const med = this.state.data.some(item => item["Drug Name"] === this.state.name && item["Drug Name"] === this.state.name && item["Form"] === this.state.form && item["Strength"] === this.state.strength && item["Active Ingredient"] === this.state.ingredient);
      console.log(med);



      var list = this.state.data
      if(!med)
      {
        let obj = {
          'id':'0',
          'Drug Name':this.state.name,
          'Form':this.state.form,
          'Strength':this.state.strength,
          'Active Ingredient':this.state.ingredient
        }

        const promise1 = new Promise(function(resolve, reject) {
                      
          axios.post('http://localhost:4000/addMedicine',obj)
          .then(res => {
              resolve(res.data)
            });
          });
        
          promise1.then((value) =>{
            alert(value)  
            if(value==="success")
              {
                
                list.push(obj)
                this.setState({
                  data:list,
                  seen: false,
                  });
              }
          });

      }
      else
      {
        alert("this item already exists")
      }

    }
  
    togglePop = () => {
      console.log("toggle pop")
      this.setState({
        seen: !this.state.seen
      });
    };




    actionsRow = ({ type, payload }) => {
        console.log(type);
        console.log(payload);
        if(type==="delete")
        {
          const promise1 = new Promise(function(resolve, reject) {
                      
            axios.post('http://localhost:4000/deleteMedicine',payload)
            .then(res => {
                resolve(res.data)
              });
            });
          
            promise1.then((value) =>{
            alert(value)  
            if(value==="success")
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

            });
        }
        else if(type==="save")
        {
          const promise1 = new Promise(function(resolve, reject) {
                      
            axios.post('http://localhost:4000/updateMedicine',payload)
            .then(res => {
                resolve(res.data)
              });
            });
          
            promise1.then((value) =>{
            alert(value)  
            if(value==="success")
              {
                console.log("befor",this.state.data)
                var list = this.state.data
                for( var i = 0; i < list.length; i++){ 
                    
                    if ( list[i]["id"] === payload.id) { 
                      list[i]["Drug Name"] = payload["Drug Name"]
                      list[i]["Strength"] = payload["Strength"]
                      list[i]["Form"] = payload["Form"]
                      list[i]["Active Ingredient"] = payload["Active Ingredient"]
                    }
                  this.setState({
                    data:list
                  })
            
                }
                console.log("after",this.state.data)
              }

            });
        }
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
            this.setState({
                data: value,
                gotData:true,
                options : {
                  title: "Medicine dataTable",
                  dimensions: {
                    datatable: {
                      width: "100%",
                      height:"480px"
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
                          id: "Drug Name",
                          label: "Name",
                          colSize: "100px",
                          editable: true,
                          dataType: "text",
                          inputType: "input"
                      },
                      {
                          id: "Form",
                          label: "Form",
                          colSize: "100px",
                          editable: true,
                          dataType: "text",
                          inputType: "input"
                      },
                      {
                          id: "Strength",
                          label: "Strength",
                          colSize: "100px",
                          editable: true,
                          dataType: "text",
                          inputType: "input"
                      },
                      {
                          id: "Active Ingredient",
                          label: "Active Ingredient",
                          colSize: "100px",
                          editable: true,
                          dataType: "text",
                          inputType: "input"
                      },
                    
                      ],
          
                    rows: value
                  },
                  features: {
                    canEdit: true,
                    canDelete: true,
                    canSearch: true,
                    canOrderColumns: true,
                    canSelectRow: true,
                    rowsPerPage: {
                      available: [10, 25, 50, 100],
                      selected: 50
                    },
                    additionalIcons: [
                      {
                        title: "Add Medicine",
                        icon: <AddIcon color="primary" />,
                        onClick: () => {this.togglePop()}
                      }
                    ]
                  }
                }
              });
        });

      }

      
    }

    render() {

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

        const createMedicineElement = () => {

          return(
            <div>
            <div className="popup">
              <div className="content">
              <span className="close" onClick={this.togglePop}>
                &times;
              </span>
              <form onSubmit={this.onSubmitModal}>
                <h3>Add Medicine Data!</h3>
                <br />  
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Drug Name"
                  required
                  value={this.state.name}
                  onChange={this.onChangename}
                  />

                <br />
                <input 
                type="text" 
                className="form-control"
                placeholder="Form"
                required
                value={this.state.form}
                onChange={this.onChangeform}
                />

                <br />
                <input 
                type="text" 
                className="form-control"
                placeholder="Strength"
                required
                value={this.state.strength}
                onChange={this.onChangestrength}
                />

                <br />
                <input 
                type="text" 
                className="form-control"
                placeholder="Active Ingredient"
                required
                value={this.state.ingredient}
                onChange={this.onChangeingredient}
                />

                <br />
                <input type="submit" />
              </form>
            </div>
        </div>
        </div>

          )
      }


        const Table = createTableElement();

        const addMedicineElement = createMedicineElement();


        return (

            <div className="base">


              <div className="table">
              {Table}
              </div>


              <div style={this.state.seen ? {display:'block'}:{display:'none'}}>
              {addMedicineElement}
              </div>

            </div>

        )
    }
}