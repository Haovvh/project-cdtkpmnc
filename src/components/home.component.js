import React, { Component } from "react";

import Customer from "./customer.component";

import GongMap from "../Goong/GoongMap";


import TotalMoney from "./totalMoney.component";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
  
  

  render() {
    return (
      <div className="container ">
        <div className="col">
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        </div>
        <div>
          <Customer/>
        </div>
        <div className="col">
          <GongMap/>
        </div>
        <div>
          
        </div>
       
        
      </div>
    );
  }
}
