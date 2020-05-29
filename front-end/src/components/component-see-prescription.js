import React, { Component } from 'react';
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
            prescription:[],
            checkPrescription:false,
            touched: {
                contact: false,
              }
            
        }
        this.onChangecontact = this.onChangecontact.bind(this);     
    }
    onChangecontact(e) {
        this.setState({
            contact: e.target.value,
            checkPrescription:true,
            prescription:[]
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
    

        const createTableElement = () => {

            if(!Validatephone(this.state.contact) && this.state.checkPrescription)
            {
            
                const user= {
                    contact:this.state.contact,
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
     
                        <div>
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
                {tableElement}
                </div>
                
            </div>
            
        )
    }

}