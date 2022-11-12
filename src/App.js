import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import RegisterUser from "./components/register.user";
import RegisterDriver from "./components/register.driver";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Driver from "./components/drivers/driver.component";
import SupportStaff from "./components/supportstaff/supportstaff.component";
import NewUser from "./components/newuser/newuser.component";
import EventBus from "./common/EventBus";
import Customer from "./components/customers/customer.component";


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
    const user = AuthService.getCurrentUser();
    
    if (user) {
      this.setState({        
        isDriver: user.role.includes('DRIVER'),
        isCustomer: user.role.includes('CUSTOMER'),
        isSupportStaff: user.role.includes('SUPPORTSTAFF'),
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
    AuthService.logout();
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
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          
          <Link to={"/"} className="navbar-brand">
            GoCarVietNam
          </Link>
          <div className="navbar-nav mr-auto">
            
            { currentUser && isDriver  && (
              <li className="nav-item">
                <Link to={"/driver"} className="nav-link">
                  Driver
                </Link>
              </li>
            )}

            { currentUser && isSupportStaff  && (
              <li className="nav-item">
                <Link to={"/supportstaff"} className="nav-link">
                  Support Staff
                </Link>
              </li>
            )}

            { currentUser && isSupportStaff  && (
              <li className="nav-item">
                <Link to={"/newuser"} className="nav-link">
                  Create User
                </Link>
              </li>
            )}
            {currentUser && isCustomer && (
              <li className="nav-item">
              <Link to={"/registerdriver"} className="nav-link">
                Register Driver
              </Link>
            </li>
            )}
            

            { currentUser && isCustomer && (
              <li className="nav-item">
                <Link to={"/customer"} className="nav-link">
                  Customer
                </Link>
              </li>
              
            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile 
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
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
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/registerdriver" element={<RegisterDriver />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/driver" element={<Driver/>} />
            <Route path="/supportstaff" element={<SupportStaff />} />
            <Route path="/newuser" element={<NewUser />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
