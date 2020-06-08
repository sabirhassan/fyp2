import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import '../css/medicine.css';




export default class reportList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportList:[],
            checkRequests:true,
            selecteditem:-1,
            seen:false,       
        }

        this.handleClick = this.handleClick.bind(this);
        this.closePop = this.closePop.bind(this)
  
    }

    closePop = () => {
        console.log("toggle pop")
        this.setState({
          seen: false,
          selecteditem:-1,
        });
      };

    handleClick(i, event) {
        this.setState({
            seen: true,
            selecteditem:i,
          });

    }

      render() {

        const createlistItems = () => {

            if(this.state.checkRequests)
            {
                const obj = JSON.parse( localStorage.getItem("patient"))
                const user= {
                    contact:obj.contact,
                }
            
                const promise1 = new Promise(function(resolve, reject) {
                    
                    axios.post('http://localhost:4000/getReports',user)
                    .then(res => {
                        resolve(res.data)
                    });
                });
                
                promise1.then((value) =>{
                    console.log(value);
                    if(value!="empty")
                    this.setState({
                        reportList: value,
                        checkRequests:false,
                    });
                });
            
            }

            if(this.state.reportList.length>0)
            {
                return this.state.reportList.map((item, index) => {
                    const { dateadded, model,prediction} = item 
                    return (
                        <tr key={index} onClick={this.handleClick.bind(this, index)}>
                            <td>{index}</td>
                            <td>{dateadded}</td>
                            <td>{model}</td>
                            <td>{prediction}</td>
                        </tr>
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
      
        const listItems =createlistItems()

        const imageItem = () => {

            if(this.state.selecteditem != -1)
            {
                return (
                    <div>
                        <div>
                            <h3>Image</h3>
                            <hr/>
                            <img src={this.state.reportList[this.state.selecteditem].image}/>
                        </div>
                        <div>
                            <h3>Prediction</h3>
                            <hr/>
                            <h4>{this.state.reportList[this.state.selecteditem].prediction}</h4>
                        </div>
                    </div>
                    );            
            }
            else
            {
                return (
                    <div>
                    </div>
                    );
            }
        }        
      
        const reportimage =imageItem()

        return (
            <div >
                <div>
                    <h3>Report List</h3>
                    <Table>
                    <thead>
                    <td>#</td>
                    <td>Date</td>
                    <td>Type</td>
                    <td>Prediction</td>
                    </thead>
                    <tbody>
                    {listItems}
                    </tbody>
                    
                    </Table>

                </div>

                <div  style={this.state.seen ? {display:'block'}:{display:'none'}}>
                    <div className="popup">
                        <div className="content">
                            <span className="close"  onClick={this.closePop}>
                            &times;
                            </span>

                            {reportimage}

                        </div>
                    </div>
                </div>


            </div>
            
        )
    }

}