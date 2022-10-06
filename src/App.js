import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardCallcenter from "./components/board-callcenter.component";
import BoardCustomer from "./components/board-customer.component";
import BoardDriver from "./components/board-driver.component";


// import AuthVerify from "./common/auth-verify";


class App extends Component {


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            GoCar
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                USer
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/customer"} className="nav-link">
                Customer
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/driver"} className="nav-link">
                Driver
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/callcenter"} className="nav-link">
                Callcenter
              </Link>
            </li>
          </div>

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">

              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" >
                LogOut
              </a>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/customer" element={<BoardCustomer />} />
            <Route path="/driver" element={<BoardDriver />} />
            <Route path="/callcenter" element={<BoardCallcenter />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
