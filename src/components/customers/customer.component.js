import React, { useState, useEffect } from "react";
import customerService from "../../services/users.service";
import BookDriver from "./bookdriver.component";
import authService from "../../services/auth.service";



export default function Customer () {

  
  const id = authService.getCurrentUser().id;
  const [InfoCustomer, setInfoCustomer] = useState({
    firstName: "",
    lastName: "",
    Phone: ""   
  })
  

  const [message, setMessage] = useState("");
  useEffect( () =>{     
    
    customerService.getCustomer(id).then(
      response => {
        if(response.data) {
          console.log(response.data)
          setInfoCustomer({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            Phone: response.data.Phone  
          })
        }
        // if(response.data.resp) {
        //   console.log(response.data);
        //   setInfoCustomer(response.data.data)
        // } else {
        //   console.log(response.status);
        //   setMessage(response.data.message)
        // }
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
        // alert("Token is Exprise. Please Login");
        // window.location.assign("http://localhost:8082/login")
      }
    )
  },[])
  
    
    return (
      <React.Fragment>
        <div className="container ">
        <div className="col">
          <header className="jumbotron">
            <h3>Customer</h3>
            <BookDriver InfoCustomer = {InfoCustomer}/>                 
          </header>
          {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}    
        </div>    
        </div>
      </React.Fragment>
      
    );
}
