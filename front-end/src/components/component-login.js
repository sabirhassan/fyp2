import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/login.css'
import AdminHome from "./component-adminhome";
import DoctorHome from "./component-doctorhome";
import DoctorAssistantHome from "./component-doctor-assistanthome";
import LabStaffHome from "./component-labstaffhome";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Email: '',
            Password: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Email: ${this.state.Email}`);
        console.log(`Password: ${this.state.Password}`);

        const user= {
            email:this.state.Email,
            password:this.state.Password
        }

        console.log(user)
        
        axios.post('http://localhost:4000/login', user)
            .then(res => {
                console.log(res.data.name);
                let type = res.data.type;
                var User = res.data
                
                if(type==="admin")
                {
                    localStorage.setItem("id",res.data.id);
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("name", res.data.name);
                    return(
                        ReactDOM.render(<AdminHome />, document.getElementById('root'))
                    );
                }
                else if(type==="doctor")
                {
                    localStorage.setItem("id",res.data.id);
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("name", res.data.name);
                    window.$email=res.data.email
                    ReactDOM.render(<DoctorHome />, document.getElementById('root'))
                }
                else if(type==="doctorAssistant")
                {
                    localStorage.setItem("id",res.data.id);
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("name", res.data.name);
                    window.$email=res.data.email
                    ReactDOM.render(<DoctorAssistantHome />, document.getElementById('root'))
                }
                else if(type==="labStaff")
                {
                    localStorage.setItem("id",res.data.id);
                    localStorage.setItem("email",res.data.email);
                    localStorage.setItem("name", res.data.name);
                    ReactDOM.render(<LabStaffHome />, document.getElementById('root'))
                }
                else if(type=="invalid")
                {
                    alert("invalid credentials")
                }
            });

        this.setState({
            Email: '',
            Password: ''
        });
    }

    render() {
        return (
                <div className="login">
                    <h1>Sign In</h1>
                    <form onSubmit={this.onSubmit}>
                    <div> 
                        <input  type="text"
                                placeholder = "Enter you email"
                                value={this.state.Email}
                                onChange={this.onChangeEmail}
                                id="email"
                                />
                    </div>

                    <div> 
                        <input  type="password"
                                placeholder = "Enter your password"
                                value={this.state.Password}
                                onChange={this.onChangePassword}
                                id="password"
                                />
                    </div>

                    <div>
                        <input type="submit" value="Login"/>
                    </div>
                   
                    </form>
            </div>
        )
    }
}