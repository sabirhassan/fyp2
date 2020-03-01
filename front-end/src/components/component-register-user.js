import React, { Component } from 'react';
import axios from 'axios';


function ValidateEmail(mail) 
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.match(mailformat))
    {
    return false;
    }
    else
    {
    return true;
    }
}

function validate(firstName,lastName,email, password) {
    // true means invalid, so our conditions got reversed
    return {
      firstName: firstName.length===0,
      lastName: lastName.length===0,
      email: ValidateEmail(email),
      password: password.length < 8
    };
}

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            userType: 'doctor',

            touched: {
                firstName: false,
                lastName: false,
                email: false,
                password: false,
              }
        }
        this.onChangefirstName = this.onChangefirstName.bind(this);
        this.onChangelastName = this.onChangelastName.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeuserType = this.onChangeuserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangefirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangelastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeemail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeuserType(e) {
        this.setState({
            userType: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`firstName: ${this.state.firstName}`);
        console.log(`lastName: ${this.state.lastName}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Password: ${this.state.password}`);
        console.log(`userType: ${this.state.userType}`);

        const user= {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password,
            userType:this.state.userType
        }

        console.log(user)
        
        axios.post('http://localhost:4000/register', user)
            .then(res => {
                console.log(res.data);
                if(res.data==="success")
                {
                    alert("User Created Successfuly");
                }
                else
                {
                    alert(res.data);
                }
            });

        this.setState({
            firstName:'',
            lastName:'',
            email: '',
            password: '',
            userTpye:'doctor'
        });
    }



      handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      }



    render() {
        const errors = validate(this.state.firstName,this.state.lastName,this.state.email, this.state.password);
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
                        <label>First Name: </label>
                        <input  type="text"
                                className={shouldMarkError("firstName") ? "form-control is-invalid" : "form-control"}
                                value={this.state.firstName}
                                onChange={this.onChangefirstName}
                                onBlur={this.handleBlur("firstName")}
                                />
                                {shouldMarkError("firstName") ?
                                <div className="invalid-feedback">
                                    Please provide a valid firstName.
                                </div>
                                :""}
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input 
                                type="text" 
                                className={shouldMarkError("lastName") ? "form-control is-invalid" : "form-control"}
                                value={this.state.lastName}
                                onChange={this.onChangelastName}
                                onBlur={this.handleBlur("lastName")}
                                />
                                {shouldMarkError("lastName") ?
                                <div className="invalid-feedback">
                                    Please provide a valid lastName.
                                </div>
                                :""}
                    </div>
                    
                    <div className="form-group">
                    <label>Email: </label>
                    <input 
                            type="text" 
                            className={shouldMarkError("email") ? "form-control is-invalid" : "form-control"}
                            value={this.state.email}
                            onChange={this.onChangeemail}
                            onBlur={this.handleBlur("email")}
                            />
                            {shouldMarkError("email") ?
                                <div className="invalid-feedback">
                                    Please provide a valid email.
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
                    <label >Choose a userType:</label>
                        <select value={this.state.userTpye} onChange={this.onChangeuserType}>
                        <option value="doctor">Doctor</option>
                        <option value="doctor assistant">Doctor Assistant</option>
                        <option value="lab staff">Lab Staff</option>
                        <option value="admin">Admin</option>
                        </select>
                        
                  </div>
                    <div className="form-group">
                        <input type="submit" disabled={isDisabled} value="Create User" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        )
    }
}