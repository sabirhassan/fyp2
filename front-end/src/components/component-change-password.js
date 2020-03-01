import React, { Component } from 'react';
import axios from 'axios';

function validate(oldPass,newPass,renewPass) {
    // true means invalid, so our conditions got reversed
    return {
      old: oldPass.length===0,
      new: newPass.length<8,
      renew: renewPass != newPass
    };
}

export default class changePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            old: '',
            new: '',
            renew:'',
            touched: {
                old: false,
                new: false,
                renew: false,
                }
        }
        this.onChangeold = this.onChangeold.bind(this);
        this.onChangenew = this.onChangenew.bind(this);
        this.onChangerenew = this.onChangerenew.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    

    onChangeold(e) {
        this.setState({
            old: e.target.value
        });
    }

    onChangenew(e) {
        this.setState({
            new: e.target.value
        });
    }
    onChangerenew(e) {
        this.setState({
            renew: e.target.value
        });
    }


    async onSubmit(e) {
        e.preventDefault();
      
        let id= localStorage.getItem("id");
        let oldPass = localStorage.getItem("password");

        console.log(`Form submitted:`);
        console.log(`id: ${id}`);
        console.log(`old: ${this.state.old}`);
        console.log(`new: ${this.state.new}`);
        console.log(`renew: ${this.state.renew}`);
        console.log(`oldPass: ${oldPass}`);
        const user= {
            id:id,
            old:this.state.old,
            new:this.state.new,
            renew:this.state.renew,
            oldPass:oldPass
        }

        console.log(user)
        
        await axios.post('http://localhost:4000/updatepassword', user)
            .then(res => {
                console.log(res.data);
                if(res.data==="success")
                {
                    localStorage.setItem("password",this.state.new);
                    alert("Password updated Successfuly");

                }
                else
                {
                    alert(res.data);
                }
            });

        this.setState({
            old: '',
            new: '',
            renew:''
        });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      }


    render() {

        const errors = validate(this.state.old,this.state.new,this.state.renew);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
      
            return hasError ? shouldShow : false;
          };

        return (
            <div style={{marginTop: 10}}>
                <h3>Change own Password</h3>
                <form onSubmit={this.onSubmit}>
                    
                    
                    <div className="form-group">
                        <label>Old Password: </label>
                        <input 
                                type="password" 
                                className={shouldMarkError("old") ? "form-control is-invalid" : "form-control"}
                                value={this.state.old}
                                onChange={this.onChangeold}
                                onBlur={this.handleBlur("old")}
                                />
                                {shouldMarkError("old") ?
                                <div className="invalid-feedback">
                                    minimum length should be of 8 characters
                                </div>
                                :""}
                    </div>

                    <div className="form-group">
                    <label>New Password: </label>
                    <input 
                            type="password" 
                            className={shouldMarkError("new") ? "form-control is-invalid" : "form-control"}
                            value={this.state.new}
                            onChange={this.onChangenew}
                            onBlur={this.handleBlur("new")}
                            />
                            {shouldMarkError("new") ?
                                <div className="invalid-feedback">
                                    minimum length should be of 8 characters
                                </div>
                                :""}
                    </div>

                    <div className="form-group">
                    <label>Retype New Password: </label>
                    <input 
                            type="password" 
                            className={shouldMarkError("renew") ? "form-control is-invalid" : "form-control"}
                            value={this.state.renew}
                            onChange={this.onChangerenew}
                            onBlur={this.handleBlur("renew")}
                            />
                            {shouldMarkError("old") ?
                                <div className="invalid-feedback">
                                    mismatch
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