import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login";
import RegisterUser from "./components/registers/customer";
import RegisterDriver from "./components/registers/driver";
import Home from "./components/home";
import Profile from "./components/profiles/profile";

import Driver from "./components/drivers/driver";
import SupportStaff from "./components/staff/staff";
import EventBus from "./common/EventBus";
import Customer from "./components/customers/customer";
import userService from "./apiService/customer";
import CallMobile from "./components/CallMobile/CallMobile"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import History from "./components/history";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showDriver: false,
      showPassenger: false,
      showSupportStaff: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = userService.getCurrentUser();
    
    if (user) {
      this.setState({        
        isDriver: user.role.includes('DRIVER'),
        isCustomer: user.role.includes('CUSTOMER'),
        isSupportStaff: user.role.includes('STAFF'),
        currentUser: user,      
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    userService.logoutUser();
    this.setState({
      isDriver: false,
      isCustomer: false,
      isSupportStaff: false,
      currentUser: undefined,
    });
  } 

  render() {
    const { currentUser, isDriver, isCustomer, isSupportStaff } = this.state;
    
    return (
      <React.Fragment>
        
        <Navbar bg="light" expand="lg" >
        <Container >
          <Navbar.Brand to={"/"} className="navbar-brand">GoCarVietNam</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">       
          <div className="navbar-nav mr-auto col-lg-3">
            <Nav className="me-auto">
            <Link to={"/"} className="navbar-brand">
            Home
          </Link>
            </Nav>
            { currentUser && isCustomer && (
              <Nav className="nav-item"> 
              <li className="nav-item">
                <Link to={"/customer"} className="nav-link">
                  Customer
                </Link>
              </li>
              </Nav>
            )}
          
          
          { currentUser && isDriver  && (
            <Nav className="nav-item"> 
              <li className="nav-item">
                <Link to={"/driver"} className="nav-link">
                  Driver
                </Link>
              </li>
              </Nav>
            )}
          
          
          { currentUser && isSupportStaff  && (
            <Nav className="nav-item"> 
              <li className="nav-item">
                <Link to={"/staff"} className="nav-link">
                  Support Staff
                </Link>
              </li>
              </Nav>
            )}
            { (currentUser )  && (
            <Nav className="nav-item"> 
              <li className="nav-item">
                <Link to={"/history"} className="nav-link">
                  History
                </Link>
              </li>
              </Nav>
            )}
          
          
          { currentUser && isSupportStaff  && (
            <Nav className="nav-item  ">
              <li className="nav-item">
                <Link to={"/callmobile"} className="nav-link">
                  Create User
                </Link>
              </li>
              </Nav>
            )}
             
          
          {currentUser && isCustomer && (
            <Nav className="nav-item">
              <li className="nav-item" variant="outline-primary">
              <Link to={"/registerdriver"} className="nav-link outline-primary">
                RegisterDriver
              </Link>
            </li>
            </Nav>
            )}
             
            </div>
          <Nav>
          {currentUser ? (
            
            <div className="navbar-nav ml-auto">
             
             <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
          <NavDropdown  title="Setting" id="collasible-nav-dropdown">
              <NavDropdown.Item href={"/profile"} className="nav-link">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/login" className="nav-link" onClick={this.logOut}>
                LogOut
              </NavDropdown.Item>
              
            </NavDropdown>
              
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>              
            </div>
          )}
          
          </Nav>
          </Navbar.Collapse> 
        </Container>
      </Navbar>       

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/registerdriver" element={<RegisterDriver />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/driver" element={<Driver/>} />
            <Route path="/staff" element={<SupportStaff />} />
            <Route path="/callmobile" element={<CallMobile />} />
          </Routes>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
