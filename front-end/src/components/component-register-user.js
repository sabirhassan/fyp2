import React, { Component } from 'react';
import axios from 'axios';

/*async function ValidateEmail(mail) 
{
    //console.log("RUNNING VALIDATE EMAIL");
    var flag = true;
    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if(mail.match(mailformat))
    {
        
        const user= {
            email:mail
        }
        console.log(mail);
        
        await axios.get('http://localhost:4000/mailcheck',{ params: {email: mail}})
            .then(res => {
                console.log("here",res.data.EmailNameInUse);
                //flag = res.data.EmailNameInUse;
                return false;
            });
            
        return false;       
    }
    else
    {
    //flag =  true;
    return true;
    }

    //return flag;
}*/


function ValidateEmail(mail) 
{
    var flag = false;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.match(mailformat))
    {        
        console.log("here in if",flag)
        console.log(mail);
        return flag;
    }
    else
    {
        flag=true;
        console.log(mail);
        console.log("here in else",flag)
        return flag;
    }
}

function validate(name,email, password) {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length===0,
      email: ValidateEmail(email),
      password: password.length < 8
    };
}

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            userType: 'doctor',

            touched: {
                name: false,
                email: false,
                password: false,
              }
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeuserType = this.onChangeuserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    

    onChangename(e) {
        this.setState({
            name: e.target.value
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
        console.log(`name: ${this.state.name}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Password: ${this.state.password}`);
        console.log(`userType: ${this.state.userType}`);

        const user= {
            name:this.state.name,
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
                    this.setState({
                        name:'',
                        email: '',
                        password: '',
                        userTpye:'doctor',
            
                        touched: {
                            name: false,
                            email: false,
                            password: false,
                          }
                    });
                    alert("User Created Successfuly");
                }
                else if(res.data==="alreadyExists")
                {
                    alert("User with this Email already exists");
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
        const errors = validate(this.state.name,this.state.email, this.state.password);
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
                                pattern="[A-Za-z]*" title="only valid alphabatic letters"
                                onChange={this.onChangename}
                                onBlur={this.handleBlur("name")}
                                />
                                {shouldMarkError("name") ?
                                <div className="invalid-feedback">
                                    Please provide a valid Name.
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
                        <br></br>
                        <select value={this.state.userTpye} onChange={this.onChangeuserType}>
                        <option value="doctor">Doctor</option>
                        <option value="doctor assistant">Doctor Assistant</option>
                        <option value="lab staff">Lab Staff</option>
                        <option value="admin">Admin</option>
                        </select>
                        
                  </div>
                  <br></br>
                    <div className="form-group">
                        <input type="submit" disabled={isDisabled} value="Create User" className="btn-primary" />
                    </div>
                </form>

            </div>
        )
    }
}