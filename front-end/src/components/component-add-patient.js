import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';

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

function validate(name,contact, password) {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length===0,
      contact: Validatephone(contact),
      password: password.length < 8
    };
}

export default class AddPatient extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            contact: '',
            password: '',
            gender:'male',

            dob:new Date(),
            
            touched: {
                name: false,
                contact: false,
                password: false,
              }
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangecontact = this.onChangecontact.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onChangedob = this.onChangedob.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }
    

    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }


    onChangecontact(e) {
        this.setState({
            contact: e.target.value
        });
    }

    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangegender(e){
        this.setState({
            gender:e.target.value
        });
    }

    onChangedob(e) {
        this.setState({
            dob:e 
        });
    }



    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`name: ${this.state.name}`);
        console.log(`contact: ${this.state.contact}`);
        console.log(`Password: ${this.state.password}`);
        console.log(`gender: ${this.state.gender}`);
        console.log(`dob: ${this.state.dob}`);

        const user= {
            name:this.state.name,
            contact:this.state.contact,
            password:this.state.password,
            gender:this.state.gender,
            dob:this.state.dob,
        }

        console.log(user)
        
        axios.post('http://localhost:4000/addpatient', user)
            .then(res => {
                console.log(res.data);
                if(res.data==="success")
                {
                    alert("Patient added Successfuly");
                }
                else
                {
                    alert(res.data);
                }
            });

        this.setState({
            name:'',
            contact: '',
            password: '',
            gender:'male',
            
            dob:new Date(),

            touched: {
                name: false,
                contact: false,
                password: false,
              }

        });
    }



      handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      }

    render() {
        const errors = validate(this.state.name,this.state.contact, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
      
            return hasError ? shouldShow : false;
          };

        return (
            <div style={{marginTop: 10}}>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                
                    <div className="form-group"> 
                        <label>Full Name: </label>
                        <input  type="text"
                                className={shouldMarkError("name") ? "form-control is-invalid" : "form-control"}
                                value={this.state.name}
                                onChange={this.onChangename}
                                onBlur={this.handleBlur("name")}
                                />
                                {shouldMarkError("name") ?
                                <div className="invalid-feedback">
                                    Please provide a valid name.
                                </div>
                                :""}
                    </div>
                    
                    <div className="form-group">
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

                    <div className="form-group">
                        <label>Password: </label>
                        <input 
                                type="password" 
                                className={shouldMarkError("password") ? "form-control is-invalid" : "form-control"}
                                value={this.state.password}
                                onChange={this.onChangepassword}
                                onBlur={this.handleBlur("password")}
                                />
                                {shouldMarkError("password") ?
                                <div className="invalid-feedback">
                                    Password should meet the minimum length of 8 Characters.
                                </div>
                                :""}
                    </div>

                    <div>
                        <label >Gender:</label>
                            <select value={this.state.gender} onChange={this.onChangegender}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="trnasgender">Trnasgender</option>
                            </select>
                            
                    </div>


                    <div>
                        <label >Date of Birth:</label>
                        <br></br>
                        <DatePicker
                        onChange={this.onChangedob}
                        value={this.state.dob}
                        maxDate={new Date()}
                        minDate={new Date("1947/08/14")}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />


                        
                    </div>
                        
 

                    <div className="form-group">
                        <input type="submit" disabled={isDisabled} value="Create User" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        )
    }
}