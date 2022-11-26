import React, { useState, useEffect } from "react";
import usersService from "../../apiService/customer";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function ProfileUser (props) {  
  const Id = usersService.getCurrentUser().id;

  const [InfoCustomer, setInfoCustomer] = useState({
    firstName: "",
    lastName: "",
    id: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    personalId: "",
    userType: "",
    vehicleInfo: {
      controlNumber: "",
      type: ""
    }
  })
  const [statusCode, setStatusCode] = useState("");  
  const [message, setMessage] = useState("");

  useEffect( () => {
    usersService.getUserbyId(Id).then(
      response => {
        if(response.data) {
          console.log(response.data);
          if(response.data.personalId){
            setInfoCustomer(prevState => ({
              ...prevState,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              phone: response.data.phone,
              username: response.data.username,
              email: response.data.email,
              userType: response.data.userType,            
              personalId: response.data.personalId,
              vehicleInfo: {
                controlNumber: response.data.vehicleInfo.controlNumber,
                type: response.data.vehicleInfo.type
              }
            }))
          } else {
            setInfoCustomer(prevState => ({
              ...prevState,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              username: response.data.username,
              phone: response.data.phone,
              email: response.data.email,
              userType: response.data.userType,            
              
            }))
          }
          
          
        } else {
        }
      }, error => {
        console.log(error)

        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        // setMessage(resMessage)
        // localStorage.removeItem("user");
        // alert("Please Login");
        // window.location.assign("http://localhost:8082/login")
      }
    )
    
  },[])    

  // gọi API trở thành tài xế
  
  const handleOnClick = () => {   
    
    if(InfoCustomer.email && InfoCustomer.firstName && InfoCustomer.lastName && InfoCustomer.phone ) {
      //Update Driver
      if(InfoCustomer.personalId && InfoCustomer.vehicleInfo.controlNumber && InfoCustomer.vehicleInfo.type) {
        usersService.putUserDriver(Id,InfoCustomer.firstName, InfoCustomer.lastName,InfoCustomer.phone, 
          InfoCustomer.email, InfoCustomer.personalId,InfoCustomer.vehicleInfo, InfoCustomer.username, InfoCustomer.password).then(
          response => {
            if(response.data) {
              console.log(response.data) 
              //setDriver(true)             
            }
            else {
              console.log("Response False")
            }                   
          },
          error => {
            console.log(error)
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
                console.log(error)                    
            })
            //update Customer
      } else {
        usersService.putUserCustomer(Id,InfoCustomer.firstName, InfoCustomer.lastName,InfoCustomer.phone, 
          InfoCustomer.email, InfoCustomer.username, InfoCustomer.password).then(
          response => {
            if(response.data) {
              console.log(response.data) 
              //setDriver(true)             
            }
            else {
              console.log("Response False")
              //setStatusCode(false); 
            }                   
          },
          error => {
            console.log(error)
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
                console.log(error)                    
            })
      }
    }
        
    }  

    const onChangeControlNumber = (event) => {
      setInfoCustomer(prevState => ({
        ...prevState,vehicleInfo: {
          controlNumber: event.target.value
        }}))
    }

    const onChangePersonalId = (event) => {
      setInfoCustomer(prevState => ({
        ...prevState,
        personalId: event.target.value
        }))
    }
  
    const onChangeType = (event) => {
      setInfoCustomer(prevState => ({
        ...prevState,vehicleInfo: {
          type: event.target.value
        }}))
    }  

  return (
    <React.Fragment>
      <div className="col-md-12">
        <div className="form-group ">
        {message && (
              <div className="form-group">
                <div
                  className={
                    statusCode
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                {message}
                </div>
              </div>
            )}            
        <div className="card">
          <div className="form-group"> 
              <label htmlFor="username">FirstName</label>
                    <input
                            type="text"
                            className="form-control"
                            value={InfoCustomer.firstName}
                            onChange={(event) => setInfoCustomer(prevState => ({...prevState, firstName: event.target.value}))}
                            validations={[required]}
                        />
          </div>
          <div className="form-group"> 
              <label htmlFor="username">LastName</label>
                    <input
                            type="text"
                            className="form-control"
                            value={InfoCustomer.lastName}
                            onChange={(event) => setInfoCustomer(prevState => ({...prevState, lastName: event.target.value}))}
                            validations={[required]}
                        />
          </div>
          <div className="form-group">
          <label htmlFor="username">Phone</label>
          <input
            type="text"
            className="form-control"
            value={InfoCustomer.phone}
            onChange={(event) => setInfoCustomer(prevState => ({...prevState, phone: event.target.value}))}
            validations={[required]}
          />
          </div> 
          <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            className="form-control"
            value={InfoCustomer.email}
            onChange={(event) => setInfoCustomer(prevState => ({...prevState, email: event.target.value}))}
            validations={[required]}
          />
          
          </div> 
          <div className="form-group">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            className="form-control"
            value={InfoCustomer.password}
            onChange={(event) => setInfoCustomer(prevState => ({...prevState, password: event.target.value}))}
            validations={[required]}
          />
          
          </div> 
          {InfoCustomer.userType === 'DRIVER' && (
            <div>
              <div className="form-group">
                  <label htmlFor="Personal">Personal ID</label>
                  <input
                    placeholder="Personal ID"
                    type="text"
                    className="form-control"
                    name="Personal"
                    value={InfoCustomer.personalId}
                    onChange={(event) => {onChangePersonalId(event)}}
                  />
                  </div>
              <div className="form-group">
                  <label htmlFor="Control">Control Number</label>
                  <input
                    placeholder="Control Number"
                    type="text"
                    className="form-control"
                    name="Control"
                    value={InfoCustomer.vehicleInfo.controlNumber}
                    onChange={(event) => {onChangeControlNumber(event)}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Car Type</label>
                  <select value={InfoCustomer.vehicleInfo.type} onChange={(event) => {onChangeType(event)}}>
                    <option value="CAR4">Car 4 seat</option>
                    <option value="CAR7">Car 7 seat</option>
                  </select>
                  
                </div>
            </div>
          )}
          </div>
          <div className="form-group ">
                        <div className="row">
                            <div className="col-5 container">
                                <button className="btn btn-primary" onClick={() => {
                                handleOnClick()}}>
                                Update
                                </button>
                            </div>
                            <div className="col-5 container">
                                <button className="btn btn-primary " onClick={() => {
                                window.location.reload();}}>Cancel</button>
                            </div>
                        </div>
                    </div>                   
                    
            </div>
        </div>
    </React.Fragment>
  );
}
