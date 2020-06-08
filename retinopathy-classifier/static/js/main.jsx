
//const ScriptTag = require ('react-script-tag');

const Button = window.Reactstrap.Button;



const Navbar = window.Reactstrap.Navbar;
const NavbarBrand = window.Reactstrap.NavbarBrand;


const Router = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const ReactMarkdown = window.ReactMarkdown;

const Form = window.Reactstrap.Form;
const FormGroup = window.Reactstrap.FormGroup;
const Label = window.Reactstrap.Label;
const Input = window.Reactstrap.Input;


const Spinner = window.Reactstrap.Spinner;

//import axios from 'axios';


const axios = window.axios;


// Obtain the root 
const rootElement = document.getElementById('root');



// Create a ES6 class component
class MainPage extends React.Component 
{


    constructor(props) {
        super(props);
        this.state = {
            rawFile:'',
            file: '',
            base64:'',
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
        this._onFileUpload = this._onFileUpload.bind(this);



    }


    save(e){
        e.preventDefault();
        var contact = this.state.contact;
        var prediction = "";
        const predictions = this.state.predictions || [];

        if (predictions.length == 0) {
            alert("no data to insert")
            return

        }
        for(let i =0; i< predictions.length;i++)
        {
            prediction = prediction + predictions[i].class +" "+ predictions[i].prob +", "
        }

        var obj = {"contact":contact,"prediction":prediction,"image":this.state.base64,"model": "diabetic ratinopathy"};
        console.log(obj)
        
        const promise1 = new Promise(function(resolve, reject) {
                    
            axios.post('http://localhost:4000/addratinopathyreport', obj)
            .then(res => {
                resolve(res.data)
            });
        });
        
        promise1.then((value) =>{
            console.log(value);
            if(value == "success")
            {
                this.setState({
                    predictions:'',
                })

                alert("Report Added Successfully!")
            }
            else
                alert(value)
        });
        
    }    

    onChangecontact(e) {
        this.setState({
            contact: e.target.value
        });
    }

    _onFileUpload(e) {

        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.setState({
            file:  URL.createObjectURL(file),
            rawFile:file,
            base64: reader.result,
            imageSelected: true
          });

        };
      }



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


    renderPrediction() 
    {
        const predictions = this.state.predictions || [];

        if (predictions.length > 0) {

            const predictionItems = predictions.map((item) =>
                <li>{item.class} ({item.prob * 100}%) </li>
            );


            return (
                <ul id="prediction-list">
                    {predictionItems}
                </ul>
            );

        } else {
            return null;
        }
    }

    createSelectItems() 
    {
        let items = [];
        let values = this.state.patients;                             
        for (let i = 0; i < values.length; i++) {
            let txt = values[i].contact + " (" + values[i].name + " )";
            let val = values[i].contact ;             
            items.push(<option key={i} value={val}>{txt}</option>);   
        }
        
        return items;
    }  

    renderSaveButton() 
    {
        

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
                        <select value={this.state.contact} id = "patients" onChange={this.onChangecontact}>
                            {this.createSelectItems()}
                        </select>
                        
                    </div>


                    <div className="form-group" style={{marginTop:10}}>
                        <input type="submit" id="save-button" onClick={this.save} value="Save report" className="btn-primary" />
                    </div>                
                </div>
            )

        } 
        else 
        {
            return null
        }
    }



    render() 
    {

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

                    <img src={this.state.file} id="selected-image" className={"img-preview"} hidden={!this.state.imageSelected}/>

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


