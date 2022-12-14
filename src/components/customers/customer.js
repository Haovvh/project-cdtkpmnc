import React, { useState, useEffect } from "react";
import userService from "../../apiService/customer";
import BookDriver from "./bookdriver";
import { WEB_LOGIN } from "../../public/const";

export default function Customer () {

  
  const id = userService.getCurrentUser().id;
  const [InfoCustomer, setInfoCustomer] = useState({
    firstName: "",
    lastName: "",
    Phone: ""   
  })
  

  const [message, setMessage] = useState("");
  useEffect( () =>{

    userService.getUserbyId(id).then(
      response => {
        if(response.data) {
          console.log(response.data)
          setInfoCustomer({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phone: response.data.phone  
          })
        }
      }, error => {
        console.log(error)
        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        setMessage(resMessage)
        userService.logoutUser();
        alert("Token is Exprise. Please Login");
        window.location.assign(WEB_LOGIN)
      }
    )
  },[])
  
    
    return (
      <React.Fragment>
        <div className="container ">
        <div className="col">
            <h3>Customer</h3>
            </div>
            <BookDriver InfoCustomer = {InfoCustomer}/>   
          {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}    
        </div>    
        
      </React.Fragment>
      
    );
}
