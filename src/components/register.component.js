import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";


export default class Register extends Component {
  

  
  render() {
    return (
      <React.Fragment>

      
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    placeholder="User Name"
                    type="text"
                    className="form-control"
                    name="username"
                    
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    placeholder="example@email.com"
                    type="text"
                    className="form-control"
                    name="email"
                    
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    
                  />
                </div>
                

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
      <div>
        
      </div>
      </React.Fragment>
    );
  }
}
