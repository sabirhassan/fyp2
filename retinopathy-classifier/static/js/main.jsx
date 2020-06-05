//import { Button } from 'reactstrap';
//import React from 'react';
const Button = window.Reactstrap.Button;



const Navbar = window.Reactstrap.Navbar;
const NavbarBrand = window.Reactstrap.NavbarBrand;
const Nav = window.Reactstrap.Nav;
const NavItem = window.Reactstrap.NavItem;
const NavLink = window.Reactstrap.NavLink;


const Router = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const ReactMarkdown = window.ReactMarkdown;

const Form = window.Reactstrap.Form;
const FormGroup = window.Reactstrap.FormGroup;
const Label = window.Reactstrap.Label;
const Input = window.Reactstrap.Input;


const UncontrolledDropdown = window.Reactstrap.UncontrolledDropdown;
const Dropdown = window.Reactstrap.Dropdown;
const DropdownToggle = window.Reactstrap.DropdownToggle;
const DropdownMenu = window.Reactstrap.DropdownMenu;
const DropdownItem = window.Reactstrap.DropdownItem;
const Spinner = window.Reactstrap.Spinner;



const axios = window.axios;

const Select = window.Select;


//import { Button } from 'reactstrap';

// Obtain the root 
const rootElement = document.getElementById('root');


class About extends React.Component {
    //

// Use the render function to return JSX component
    render() {
        return (

            <div>
                <h1>About</h1>
                <ReactMarkdown source={window.APP_CONFIG.about}/>
            </div>
        );
    }
}


// Create a ES6 class component
class MainPage extends React.Component {
    //

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            predictions:[],
            patients:[],
            checkpatients:true,
            imageSelected: false,
            isLoading: false,
            contact:"",
        }

        this.renderPrediction = this.renderPrediction.bind(this);
        this.renderSaveButton = this.renderSaveButton.bind(this);
        this.onChangecontact = this.onChangecontact.bind(this);
        this.save = this.save.bind(this);


    }

    save(e) {
        alert("save button clicked!");
    }


    onChangecontact(e) {
        this.setState({
            contact: e.target.value
        });
    }

    _onFileUpload = (event) => {
        this.setState({
            rawFile: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0]),
            imageSelected: true
        })
    };



    _predict = async (event) => {
        this.setState({isLoading: true});

        let resPromise = null;
        if (this.state.rawFile) {
            const data = new FormData();
            data.append('file', this.state.rawFile);
            resPromise = axios.post('/api/classify', data);
        } else {
            resPromise = axios.get('/api/classify', {
                params: {
                    url: this.state.file
                }
            });
        }

        try {
            const res = await resPromise;
            const payload = res.data;

            this.setState({predictions: payload.predictions, isLoading: false});
            console.log(payload)
        } catch (e) {
            alert(e)
        }
    };


    renderPrediction() {
        const predictions = this.state.predictions || [];

        if (predictions.length > 0) {

            const predictionItems = predictions.map((item) =>
                <li>{item.class} ({item.prob * 100}%) </li>
            );


            return (
                <ul>
                    {predictionItems}
                </ul>
            )

        } else {
            return null
        }
    }

    createSelectItems() {
        let items = [];
        let values = this.state.patients;                             
        for (let i = 0; i < values.length; i++) {
            let txt = values[i].contact + " (" + values[i].name + " )";
            let val = values[i].contact ;             
            items.push(<option key={i} value={val}>{txt}</option>);   
        }
        
        return items;
    }  

    renderSaveButton() {
        

        
        if(this.state.checkpatients)
        {

            const promise1 = new Promise(function(resolve, reject) {
                            
                axios.post('http://localhost:4000/getpatientslist')
                .then(res => {
                    resolve(res.data)
                });
            });
            
            promise1.then((values) =>{
                if(values!="empty")
                {
                    this.setState({
                        patients:values,
                        checkpatients:false,
                    })
                }
            });
        
        }

        if (this.state.patients.length > 0) 
        {

         
            return (
                <div>
                    <div>
                        <label >Select Patient:</label>
                        <select value={this.state.contact} onChange={this.onChangecontact}>
                            {this.createSelectItems()}
                        </select>
                        
                    </div>


                    <div className="form-group" style={{marginTop:10}}>
                        <input type="submit" onClick={this.save}  value="Save report" className="btn-primary" />
                    </div>                
                </div>
            )

        } 
        else 
        {
            return null
        }
    }



    render() {

        return (
            <div>

                <Form>

                    <FormGroup id={"upload_button"}>
                        <div>
                            <p>Upload an image</p>
                        </div>
                        <Label for="imageUpload">
                            <Input type="file" 
                                name="file" 
                                id="imageUpload" 
                                accept=".png, .jpg, .jpeg" 
                                ref="file"
                                onChange={this._onFileUpload}/>
                            
                            <span className="btn btn-primary">Upload</span>
                        </Label>
                    </FormGroup>

                    <img src={this.state.file} className={"img-preview"} hidden={!this.state.imageSelected}/>

                    <FormGroup>
                        <Button color="success" 
                        onClick={this._predict}        
                        disabled={this.state.isLoading}
                        hidden={!this.state.imageSelected}> Predict</Button>
                        <span className="p-1 "/>

                    </FormGroup>


                    {this.state.isLoading && (
                        <div>
                            <Spinner color="primary" type="grow" style={{width: '5rem', height: '5rem'}}/>

                        </div>
                    )}

                

                {this.renderPrediction()}

                {this.renderSaveButton()}

                </Form>

            </div>
        );
    }
}

class CustomNavBar extends React.Component {


    render() {
        const link = APP_CONFIG.code;
        return (
            <Navbar color="light" light fixed expand="md">
                <NavbarBrand href="/">{APP_CONFIG.title}</NavbarBrand>
                
            </Navbar>
        )
    }
}

// Create a function to wrap up your component
function App() {
    return (


        <Router>
            <div className="App container">
                <CustomNavBar/>
                <div>
                    <main role="main" className="container">
                        <Route exact path="/" component={MainPage}/>
                    </main>

                </div>
            </div>
        </Router>
    )
}

(async () => {
    const response = await fetch('/config');
    const body = await response.json();

    window.APP_CONFIG = body;

    // Use the ReactDOM.render to show your component on the browser
    ReactDOM.render(
        <App/>,
        rootElement
    )
})();


