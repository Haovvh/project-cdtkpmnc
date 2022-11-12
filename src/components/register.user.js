import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }
  onChangeFirstname(event) {
    this.setState({
      firstName: event.target.value
    });
  }
  onChangeLastname(event) {
    this.setState({
      lastName: event.target.value
    });
  }
  onChangePhone(event) {
    this.setState({
      phone: event.target.value
    });
  }
  onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }


  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleRegister(event) {
    event.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.firstName,
        this.state.lastName,
        this.state.phone,
        this.state.email,
        this.state.password
      ).then(
        
        response => {
          if(response.status === 200) {
            alert("Register Success")
            window.location.assign('/login')
          }
          
        },
        //Xử lý trường hợp đăng ký không thành công?
        error => {
          console.log(error)
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

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
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    placeholder="User Name"
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    placeholder="First Name"
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstname}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastname}
                    validations={[required, vusername]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    placeholder="Email@gmail.com"
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, Email]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <Input
                    placeholder="Phone"
                    type="phone"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    validations={[required]}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Register</button>
                </div>
              </div>
            )}

            {this.state.message && (
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
            )}
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
