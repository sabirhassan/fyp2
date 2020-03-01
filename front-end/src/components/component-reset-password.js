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

function validate(email, password) {
    // true means invalid, so our conditions got reversed
    return {
      email: ValidateEmail(email),
      password: password.length < 8
    };
}

export default class resetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            touched: {
                email: false,
                password: false,
              }
        }
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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



    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Password: ${this.state.password}`);

        const user= {
            email:this.state.email,
            password:this.state.password,
        }

        console.log(user)
        
        console.log(localStorage.getItem("id"));

        axios.post('http://localhost:4000/passwordreset', user)
            .then(res => {
                console.log(res.data);
                if(res.data==="success")
                {
                    alert("Password reset Successfuly");
                }
                else
                {
                    alert(res.data);
                }
            });

        this.setState({
            email: '',
            password: '',
        });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      }

      

    render() {
        const errors = validate(this.state.email,this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
      
            return hasError ? shouldShow : false;
          };
        return (
            <div style={{marginTop: 10}}>
                <h3>Reset Password</h3>
                <form onSubmit={this.onSubmit}>
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
                                className="form-control"
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

                    <div className="form-group">
                        <input type="submit" disabled={isDisabled} value="Create User" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        )
    }
}